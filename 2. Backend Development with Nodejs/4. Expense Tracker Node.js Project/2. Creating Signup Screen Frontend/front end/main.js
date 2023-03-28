let form = document.getElementById("my-form");

async function formhandler(e) {
  e.preventDefault();
  try {
    const obj = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    name.value = "";
    email.value = "";
    password.value = "";
    await axios.post("http://localhost:3000/users/add-user", obj);
  } catch (err) {
    console.log(err);
    alert("Unsuccessful");
  }
}
