const messageForm = document.getElementById("messageForm");

//

messageForm.onsubmit = async (e) => {
    try {
        e.preventDefault();
    const message = e.target.message.value;
    const token = localStorage.getItem('token');
    console.log(token);
    await axios.post('http://localhost:3000/messages/add-message', {message:message},{
        headers: { token:token},
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