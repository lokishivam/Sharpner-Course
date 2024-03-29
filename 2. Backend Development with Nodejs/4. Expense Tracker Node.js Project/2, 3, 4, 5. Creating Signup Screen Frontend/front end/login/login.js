const form = document.getElementById("login-form");
const message = document.getElementById("message");

async function formhandler(e) {
  e.preventDefault();
  try {
    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const result = await axios.post(
      "http://localhost:3000/users/verify-user",
      obj
    );

    message.innerHTML = `Login Successful`;
    message.classList.add("successMessage");

    e.target.name.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
  } catch (err) {
    message.classList.remove("successMessage"); //why do we need to remove here and not above.
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
