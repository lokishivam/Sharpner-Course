const form = document.getElementById("login-form");
const message = document.getElementById("message");

async function formhandler(e) {
  e.preventDefault();
  try {
    const obj = {
      email: e.target.email.value,
      password: e.target.password.value,
      mobile: e.target.mobile.value,
    };

    const result = await axios.post(
      "http://localhost:3000/users/verify-user",
      obj
    );
    message.classList.remove("errorMessage");
    message.innerHTML = `Login Successful`;
    message.classList.add("successMessage");

    e.target.email.value = "";
    e.target.password.value = "";
    e.target.mobile.value = "";

    //localStorage.setItem("token", result.data.token); //storing the token in the localStorage.

    //window.location.href = "../expenses/index.html";
  } catch (err) {
    message.classList.remove("successMessage");
    // if (err.response) {
    //   message.innerHTML = `Login Failed : ${err.response.data.errors[0].message}`;
    // } else {
      message.innerHTML = `Login Failed : ${err}`;
    }
    message.classList.add("errorMessage");
  //}
}
