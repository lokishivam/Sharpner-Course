const messageForm = document.getElementById("messageForm");
const displayMessages = document.getElementById("displayMessages");
const createGroupBtn = document.getElementById("createGroupBtn");
const groupList = document.getElementById("groupList");
const groupTitle = document.getElementById("groupTitle");
const groupTitleParent = document.getElementById("groupTitleParent");
const manageBtn = document.getElementById("manageBtn");
const dummyDivManageBtn = document.getElementById("dummyDivManageBtn");
let currentOpenGroupId = undefined;

//------------------------Token-----------------------------------------------------------
const token = localStorage.getItem("token");
const decodedToken = parseJwt(token);
const myId = decodedToken.id;

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

//_____________________________________________________________________________________________
//                                   Messages

async function getAllMessages() {
  try {
    const response = await axios.get(
      `http://localhost:3000/messages/get-all-messages/${currentOpenGroupId}`,
      {
        headers: { token: token },
      }
    );
    const messages = response.data;
    // clear the displayMessages element before adding new messages
    displayMessages.innerHTML = "";
    displayMsg(messages);
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
}

async function getRecentMessages() {
  try {
    //get older chats
    const olderChats = JSON.parse(localStorage.getItem("olderChats"));
    console.log("olderChats = ", olderChats);
    //we want the recent chat, i.e. after the olderChat ends
    const from =
      1 + (olderChats.length === 0 ? 0 : olderChats[olderChats.length - 1].id);
    console.log("from = ", from);
    //get the recent messages
    const response = await axios.get(
      `http://localhost:3000/messages/get-recent-messages/?from=${from}`,
      {
        headers: { token: token },
      }
    );
    const recentChats = response.data;
    //combine both the chats to display the final chats
    let finalChats = [...olderChats, ...recentChats];

    displayMessages.innerHTML = "";
    displayMsg(finalChats);

    if (finalChats.length > 10) {
      finalChats = finalChats.slice(-10);
    }
    localStorage.setItem("olderChats", JSON.stringify(finalChats));
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
}

function displayMsg(messages) {
  messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `${message.sender} : ${message.message}`;
    messageDiv.classList.add("chat-bubble");
    messageDiv.classList.add(
      message.userId === myId ? "chat-bubble-right" : "chat-bubble-left"
    );
    displayMessages.append(messageDiv);
  });
}

//getRecentMessages();
//
//getAllMessages();
//setInterval(getAllMessages,1000);//calls after every sec, setTimeOut calls after a sec but only once.

//send message Forms
messageForm.onsubmit = async (e) => {
  try {
    e.preventDefault();
    const message = e.target.message.value;
    await axios.post(
      `http://localhost:3000/messages/add-message/${currentOpenGroupId}`,
      { message: message },
      {
        headers: { token: token },
      }
    );

    e.target.message.value = "";
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
};

//___________________________________________________________________________________________________
//                                          Groups

createGroupBtn.addEventListener("click", async () => {
  try {
    const groupNameInput = document.getElementById("groupNameInput");
    const groupName = groupNameInput.value;
    const obj = {
      groupName,
      userId: myId,
    };
    const response = await axios.post(
      "http://localhost:3000/groups/create-group",
      obj,
      {
        headers: { token: token },
      }
    );
    const groupId = response.data.id;
    currentOpenGroupId = groupId;
    //on the UI, add this group to the groups list

    appendLiToGroupList(groupId, groupName, true);

    displayMessages.innerHTML = "";
    groupTitle.innerHTML = groupName;
    groupTitle.classList.remove("bg-danger");
    groupTitle.classList.add("bg-warning");
    groupNameInput.value = "";
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
});

function appendLiToGroupList(groupId, groupName, isAdmin) {
  const li = document.createElement("li");
  li.id = groupId;
  li.dataset.isAdmin = isAdmin;
  li.innerHTML = groupName;
  li.classList.add(
    "list-group-item",
    "mb-2",
    "center",
    "bg-primary",
    "text-white"
  );
  groupList.appendChild(li);
}

//add try catch
async function getAllGroups() {
  const response = await axios.get(
    "http://localhost:3000/groups/get-all-groups",
    {
      headers: { token: token },
    }
  );
  const groups = response.data;
  groups.forEach((group) => {
    appendLiToGroupList(group.id, group.name, group.groupMembership.isAdmin);
  });
}

getAllGroups();

//add try catch
//SELCET a group to chat
groupList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("list-group-item")) {
    const groupId = e.target.id;
    currentOpenGroupId = groupId; //very imp to get correct messages in your messages box
    displayMessages.innerHTML = "";
    groupTitle.innerHTML = e.target.textContent;
    groupTitleParent.classList.remove("bg-danger");
    groupTitleParent.classList.add("bg-warning");
    const adminLogo = document.getElementById("adminLogo");
    const isAdmin =
      e.target.dataset.isAdmin === "false"
        ? false
        : e.target.dataset.isAdmin === "true";
    if (isAdmin) {
      adminLogo.textContent = "admin";
      adminLogo.classList.add("bg-info", "text-white", "p-2");
      dummyDivManageBtn.style.display = "none";
      manageBtn.style.display = "block";
    } else {
      adminLogo.classList.remove("bg-info", "text-white", "p-2");
      adminLogo.textContent = "";
      dummyDivManageBtn.style.display = "block";
      manageBtn.style.display = "none";
    }
    getAllMessages(); //I let it work async, i.e without await, as the messages will be printed by that function
  }
});

//___________________________________________________________________________
//                                 Admin page UI manipulation

// add event listener for manage button
const chatCol = document.getElementById("chatCol");
manageBtn.addEventListener("click", function () {
  // hide manage button and show manage column
  manageBtn.style.display = "none";
  dummyDivManageBtn.style.display = "block";
  document.getElementById("manageColumn").style.display = "block";
  // reduce chat column to 6
  chatCol.classList.remove("col-sm-8");
  chatCol.classList.add("col-sm-6");
});

// add event listener for close button
document.getElementById("closeBtn").addEventListener("click", function () {
  // hide manage column and show manage button
  document.getElementById("manageColumn").style.display = "none";
  manageBtn.style.display = "block";
  dummyDivManageBtn.style.display = "none";
  // expand chat column to 8
  document;
  chatCol.classList.remove("col-sm-6");
  chatCol.classList.add("col-sm-8");
});

//___________________________________________________________________________
//FORM HANDLING FOR ADMIN ACTIONS
const adminResult = document.getElementById("adminResult");

const addUserModalFormBtn = document.getElementById("addUserModalForm");
addUserModalFormBtn.addEventListener("click", async () => {
  try {
    const userEmail = document.getElementById("userEmailAddUser").value;
    console.log(currentOpenGroupId);
    const result = await axios.post(
      "http://localhost:3000/admin/add-to-group",
      { userEmail, groupId: currentOpenGroupId },
      { headers: { token } }
    );
    adminResult.classList.add("bg-info");
    adminResult.innerHTML = result.data.message;

    setTimeout(() => {
      //remove the result
      adminResult.classList.remove("bg-info");
      adminResult.innerHTML = "";
    }, 4000);
  } catch (error) {
    console.log(error);
    if (error.response) {
      adminResult.innerHTML = error.response.data.message;
    } else {
      alert(error);
    }

    adminResult.classList.add("bg-danger");

    setTimeout(() => {
      //remove the result
      adminResult.classList.remove("bg-danger");
      adminResult.innerHTML = "";
    }, 5000);
  }
});

const removeUserModalFormBtn = document.getElementById("removeUserModalForm");
removeUserModalFormBtn.addEventListener("click", async () => {
  try {
    const userEmail = document.getElementById("userEmailRemoveUser").value;
    console.log(currentOpenGroupId);
    const result = await axios.post(
      "http://localhost:3000/admin/remove-from-group",
      { userEmail, groupId: currentOpenGroupId },
      { headers: { token } }
    );
    adminResult.classList.add("bg-info");
    adminResult.innerHTML = result.data.message;

    setTimeout(() => {
      //remove the result
      adminResult.classList.remove("bg-info");
      adminResult.innerHTML = "";
    }, 4000);
  } catch (error) {
    console.log(error);
    if (error.response) {
      adminResult.innerHTML = error.response.data.message;
    } else {
      alert(error);
    }

    adminResult.classList.add("bg-danger");

    setTimeout(() => {
      //remove the result
      adminResult.classList.remove("bg-danger");
      adminResult.innerHTML = "";
    }, 5000);
  }
});

const makeAdminModalFormBtn = document.getElementById("makeAdminModalForm");
makeAdminModalFormBtn.addEventListener("click", async () => {
  try {
    const userEmail = document.getElementById("userEmailmakeAdmin").value;
    console.log(currentOpenGroupId);
    const result = await axios.post(
      "http://localhost:3000/admin/make-user-admin",
      { userEmail, groupId: currentOpenGroupId },
      { headers: { token } }
    );
    adminResult.classList.add("bg-info");
    adminResult.innerHTML = result.data.message;

    setTimeout(() => {
      //remove the result
      adminResult.classList.remove("bg-info");
      adminResult.innerHTML = "";
    }, 4000);
  } catch (error) {
    console.log(error);
    if (error.response) {
      adminResult.innerHTML = error.response.data.message;
    } else {
      alert(error);
    }

    adminResult.classList.add("bg-danger");

    setTimeout(() => {
      //remove the result
      adminResult.classList.remove("bg-danger");
      adminResult.innerHTML = "";
    }, 5000);
  }
});

//____________________________________________________________________________
//leave the live messages for now.
//for later, add ons
//1. on reload, the user will have to choose which group.
