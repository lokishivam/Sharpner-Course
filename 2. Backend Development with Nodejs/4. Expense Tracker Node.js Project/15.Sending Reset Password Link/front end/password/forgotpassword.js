const form = document.getElementById("forgotpassword-form");
const message = document.getElementById("message");

async function formhandler(e) {
  e.preventDefault();
  try {
    const obj = {
      email: e.target.email.value,
    };

    const result = await axios.post(
      "http://localhost:3000/password/forgotPassword",
      obj
    );
    message.classList.remove("errorMessage");
    message.innerHTML = `${result.data}`;
    message.classList.add("successMessage");
    e.target.email.value = "";
  } catch (err) {
    console.log(err);
    message.classList.remove("successMessage");
    message.classList.add("errorMessage");
    if (err.response) {
      message.innerHTML = `Login Failed : ${err.response.data.error}`;
    } else {
      message.innerHTML = `Login Failed : ${err}`;
    }

    // setTimeout(() => {
    //   message.remove();
    // }, 4000);
  }
}
