const name = document.getElementById("name");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
const phone = document.getElementById("phone");
const list = document.getElementById("users");

function formhandler(e) {
  e.preventDefault();

  const obj = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
  };
  const li = document.createElement("li");
  const button = document.createElement("button");
  const button2 = document.createElement("button");
  button.innerText = "delete";
  button.className = "delete";
  button2.innerText = "edit";
  button2.className = "edit";
  li.innerText = `${name.value}-${email.value}-${phone.value}`;
  li.appendChild(button);
  li.appendChild(button2);
  list.appendChild(li);
  name.value = "";
  email.value = "";
  phone.value = "";
  axios
    .post(
      "https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/appointments",
      obj
    )
    .then((res) => {
      let returnedID = res.data._id;
      li.id = returnedID;
    })
    .catch((err) => console.log(err));
}

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const par = e.target.parentElement;
    let id = par.id;
    axios.delete(
      `https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/appointments${id}`
    );
    par.remove();
  }
  if (e.target.classList.contains("edit")) {
    const par = e.target.parentElement;
    let id = par.id;
    axios
      .get(
        `https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/appointments/${id}`
      )
      .then((res) => {
        let user = res.data;
        name.value = user.name;
        email.value = user.email;
        phone.value = user.phone;
        par.remove();
        axios.delete(
          `https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/appointments/${id}`
        );
      })
      .catch();
    par.remove();
  }
});

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get(
      "https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/appointments"
    )
    .then((res) => {
      for (let obj of res.data) {
        const li = document.createElement("li");
        li.id = obj._id;
        const button = document.createElement("button");
        const button2 = document.createElement("button");
        button.innerText = "delete";
        button.className = "delete";
        button2.innerText = "edit";
        button2.className = "edit";
        li.innerText = `${obj.name}-${obj.email}-${obj.phone}`;
        li.appendChild(button);
        li.appendChild(button2);
        list.appendChild(li);
      }
    })
    .catch();
});
