const form = document.getElementById("my-form");
const message = document.getElementById("message");

async function formhandler(e) {
  e.preventDefault();
  try {
    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      mobile: e.target.mobile.value,
    };

    console.log(obj);
    //const data = await axios.post("http://localhost:3000/users/add-user", obj);

    e.target.name.value = "";
    e.target.email.value = "";
    e.target.password.value = "";
    e.target.mobile.value = "";

    message.classList.remove("errorMessage");
    message.classList.add("successMessage");
    message.innerHTML = `Sign-up successful `;
  } catch (err) {
    message.classList.remove("successMessage");
    if (err.response) {
      message.innerHTML = `Login Failed : ${err.response.data.errors[0].message}`;
    } else {//error while making a axios call.
      message.innerHTML = `Login Failed : ${err}`;
    }
    message.classList.add("errorMessage");
  }
}
