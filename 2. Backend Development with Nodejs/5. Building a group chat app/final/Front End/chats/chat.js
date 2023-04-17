const messageForm = document.getElementById("messageForm");
const displayMessages = document.getElementById('displayMessages');

//--------------------Token----------------
const token = localStorage.getItem('token');
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
//_____________________________________________________
//                                   Messages

async function getAllMessages(){
    try {
        const response = await axios.get('http://localhost:3000/messages/get-all-messages',
        {
            headers: { token:token},
        });
        const messages = response.data;
        // clear the displayMessages element before adding new messages
        displayMessages.innerHTML = '';
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

async function getRecentMessages(){
    try {
        //get older chats
        const olderChats = JSON.parse(localStorage.getItem('olderChats'));
        console.log('olderChats = ', olderChats);
        //we want the recent chat, i.e. after the olderChat ends
        const from = 1 + (olderChats.length === 0 ? 0 : olderChats[olderChats.length-1].id);
        console.log('from = ',from)
        //get the recent messages
        const response = await axios.get(`http://localhost:3000/messages/get-recent-messages/?from=${from}`,
        {
            headers: { token:token},
        });
        const recentChats = response.data;
        //combine both the chats to display the final chats
        let finalChats = [...olderChats, ...recentChats];
    
        displayMessages.innerHTML = '';
        displayMsg(finalChats);
        
        if(finalChats.length > 10){
            finalChats = finalChats.slice(-10);
        }
        localStorage.setItem('olderChats', JSON.stringify(finalChats));
        
    } catch (error) {
        console.log(error);
        if (error.response) {
            alert(error.response.data.message);     
        } else {
            alert(error);
        }
    }
}

function displayMsg(messages){
    messages.forEach((message) => {
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = `${message.sender} : ${message.message}`
        messageDiv.classList.add('chat-bubble');
        messageDiv.classList.add(message.userId === myId ? 'chat-bubble-right' : 'chat-bubble-left');
        displayMessages.append(messageDiv);
    })
}

getRecentMessages();
//setInterval(getAllMessages,1000);//calls after every sec, setTimeOut calls after a sec but only once.
//--------------------------------------------------------------------

messageForm.onsubmit = async (e) => {
    try {
        e.preventDefault();
    const message = e.target.message.value;
    await axios.post('http://localhost:3000/messages/add-message', {message:message},{
        headers: { token:token},
      });

    e.target.message.value = '';  
    } catch (error) {
        console.log(error);
        if (error.response) {
            alert(error.response.data.message);     
        } else {
            alert(error);
        }   
    }
}
