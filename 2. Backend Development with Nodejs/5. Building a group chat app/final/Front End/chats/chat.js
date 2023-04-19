const messageForm = document.getElementById("messageForm");
const displayMessages = document.getElementById("displayMessages");
const createGroupBtn = document.getElementById("createGroupBtn");
const groupList = document.getElementById("groupList");
const groupTitle = document.getElementById("groupTitle");
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
  li.classList.add("list-group-item");
  li.classList.add("center");
  li.classList.add("bg-primary");
  li.classList.add("text-white");
  groupList.appendChild(li);
}

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

groupList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("list-group-item")) {
    const groupId = e.target.id;
    currentOpenGroupId = groupId; //very imp to get correct messages in your messages box
    displayMessages.innerHTML = "";
    groupTitle.innerHTML = e.target.textContent;
    groupTitle.classList.remove("bg-danger");
    groupTitle.classList.add("bg-warning");
    getAllMessages(); //I let it be work async, i.e without await, as the messages will be printed by the function
  }
});

//___________________________________________________________________________
//leave the live messages for now.
//for later, add ons
//1. on reload, the user will have to choose which group.
