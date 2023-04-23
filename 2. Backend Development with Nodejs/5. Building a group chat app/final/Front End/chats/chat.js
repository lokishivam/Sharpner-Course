const socket = io("ws://localhost:3000");
const messageForm = document.getElementById("messageForm");
const displayMessages = document.getElementById("displayMessages");
const createGroupBtn = document.getElementById("createGroupBtn");
const groupList = document.getElementById("groupList");
const groupTitle = document.getElementById("groupTitle");
const groupTitleParent = document.getElementById("groupTitleParent");
const manageBtn = document.getElementById("manageBtn");
const dummyDivManageBtn = document.getElementById("dummyDivManageBtn");
let currentOpenGroupId = undefined;
let currentOpenGroupOldestIndex = undefined;

//------------------------------Token------------------------------------
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

//setting an eventListner for recieving a message from the group
socket.on("recieveMessage", (groupId, message) => {
  try {
    if (message && groupId === currentOpenGroupId) {
      const messageDiv = displayAMessageOnChatBox(message);
      displayMessages.append(messageDiv);
      displayMessages.scrollTop = displayMessages.scrollHeight;
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

async function getOlderMessages() {
  try {
    const response = await axios.get(
      `http://localhost:3000/messages/get-recent-messages/?oldestMessageLoaded=${currentOpenGroupOldestIndex}&groupId=${currentOpenGroupId}`,
      {
        headers: { token: token },
      }
    );
    const messages = response.data.messages;
    const oldestMessageSentIndex = response.data.oldestMessageSentIndex;
    console.log(messages);
    messages.reverse().forEach((message) => {
      const messageDiv = displayAMessageOnChatBox(message);
      displayMessages.insertBefore(messageDiv, displayMessages.firstChild);
    });
    // console.log(messages);

    if (messages.length > 0) {
      currentOpenGroupOldestIndex = oldestMessageSentIndex; //update the oldermessage.
      console.log("oldest message : ", currentOpenGroupOldestIndex);
      if (currentOpenGroupOldestIndex > 0) {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.textContent = "Load More Messages";
        loadMoreButton.classList.add("btn", "btn-primary");

        // Create the div element to hold the button
        const loadMoreDiv = document.createElement("div");
        loadMoreDiv.classList.add("load-more");
        loadMoreDiv.appendChild(loadMoreButton);
        displayMessages.insertBefore(loadMoreDiv, displayMessages.firstChild);
        loadMoreButton.addEventListener("click", () => {
          getOlderMessages();
          loadMoreDiv.remove();
        });
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
}

//display single message on the current chatBOX
function displayAMessageOnChatBox(message) {
  const messageDiv = document.createElement("div");
  if (message.message) {
    messageDiv.innerHTML = `${
      message.userId === myId ? "You" : message.sender
    } : ${message.message}`;
    messageDiv.classList.add("chat-bubble");
    messageDiv.classList.add(
      message.userId === myId ? "chat-bubble-right" : "chat-bubble-left"
    );
  } else {
    const img = document.createElement("img");
    img.classList.add("image");
    img.classList.add(message.userId === myId ? "float-right" : "float-left");
    img.src = message.imageLink;
    messageDiv.appendChild(img);
  }

  return messageDiv;
}

//

//send message Forms
messageForm.onsubmit = async (e) => {
  try {
    e.preventDefault();
    const message = e.target.message.value;
    const fileInput = document.getElementById("file-input");

    if (currentOpenGroupId == undefined) {
      e.target.message.value = "";
      console.log("message=", message);
      fileInput.value = null;
      throw new Error("Error: select a group");
    }

    if (message === "") {
      //file selected

      console.log(fileInput.value);
      const file = fileInput.files[0]; // get the selected file

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // read the file as a data URL

        reader.onload = () => {
          const dataUrl = reader.result;
          socket.emit(
            "image-upload",
            currentOpenGroupId,
            myId,
            dataUrl,
            (response, error) => {
              console.log(response);
              if (error) {
                throw new Error(error);
              }
            }
          ); // send the data URL to the server
          fileInput.value = null;
        };
      } else {
        throw new Error("Enter a message or select a file");
      }
    } else {
      //message
      socket.emit(
        "sendMessage",
        currentOpenGroupId,
        myId,
        message,
        (response, error) => {
          console.log(response);
          if (error) {
            throw new Error(error);
          }
        }
      );

      e.target.message.value = "";
    }
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

//
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
    currentOpenGroupOldestIndex = undefined;
    //on the UI, add this group to the groups list

    appendLiToGroupList(groupId, groupName, true);

    displayMessages.innerHTML = "";
    groupTitle.innerHTML = groupName;
    groupTitleParent.classList.remove("bg-danger"); //_________________________________________=+===========
    groupTitleParent.classList.add("groupTitleColor");
    groupNameInput.value = "";

    socket.emit("joinRoom", currentOpenGroupId, (message) => {
      console.log(message);
    });
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
  try {
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
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
  }
}

getAllGroups();

//add try catch
//SELCET a group to chat
groupList.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("list-group-item")) {
      const groupId = e.target.id;

      currentOpenGroupId = groupId; //very imp to get correct messages in your messages box
      currentOpenGroupOldestIndex = undefined;

      displayMessages.innerHTML = "";
      groupTitle.innerHTML = e.target.textContent;
      groupTitleParent.classList.remove("bg-danger");
      groupTitleParent.classList.add("groupTitleColor");
      const adminLogo = document.getElementById("adminLogo");
      const isAdmin =
        e.target.dataset.isAdmin === "false"
          ? false
          : e.target.dataset.isAdmin === "true";
      if (isAdmin) {
        adminLogo.textContent = "Admin";
        adminLogo.classList.add("bg-warning", "text-black", "p-2");
        dummyDivManageBtn.style.display = "none";
        manageBtn.style.display = "block";
      } else {
        adminLogo.classList.remove("bg-info", "text-white", "p-2");
        adminLogo.textContent = "";
        dummyDivManageBtn.style.display = "block";
        manageBtn.style.display = "none";
      }

      await getOlderMessages();
      displayMessages.scrollTop = displayMessages.scrollHeight;
      //socket.io, joining to a group on the io instance of the server
      //joining the  group after you retrive the older messages.
      socket.emit("joinRoom", currentOpenGroupId, (message) => {
        console.log(message);
      });
    }
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert(error);
    }
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
