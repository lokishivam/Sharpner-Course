const form = document.getElementById("my-form");
const message = document.getElementById("message");

async function formhandler(e) {
  e.preventDefault();
  try {
    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const data = await axios.post("http://localhost:3000/users/add-user", obj);
    name.value = "";
    email.value = "";
    password.value = "";
    message.classList.remove("errorMessage");
    message.classList.add("successMessage");
    message.innerHTML = `Sign-up successful `;
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
