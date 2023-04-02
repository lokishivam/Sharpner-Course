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
    message.innerHTML = `Login Successful`;
    message.classList.add("successMessage");

    e.target.email.value = "";
  } catch (err) {
    message.classList.remove("successMessage");
    if (err.response) {
      message.innerHTML = `Login Failed : ${err.response.data.errors[0].message}`;
    } else {
      message.innerHTML = `Login Failed : ${err}`;
    }
    message.classList.add("errorMessage");
    // setTimeout(() => {
    //   message.remove();
    // }, 4000);
  }
}
