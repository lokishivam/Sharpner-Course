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

async function getAllMessages(){
    try {
        const response = await axios.get('http://localhost:3000/messages/get-all-messages',
        {
            headers: { token:token},
        });
        const messages = response.data;
        messages.forEach((message) => {
            const messageDiv = document.createElement('div');
            messageDiv.innerHTML = `${message.sender} : ${message.message}`
            messageDiv.classList.add('chat-bubble');
            messageDiv.classList.add(message.userId === myId ? 'chat-bubble-right' : 'chat-bubble-left');
            displayMessages.append(messageDiv);
        })
    } catch (error) {
        console.log(error);
        if (error.response) {
            alert(error.response.data.message);     
        } else {
            alert(error);
        }
    }
}
getAllMessages();

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
