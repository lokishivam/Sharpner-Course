const name = document.getElementById("name");
const email = document.getElementById("email");
const btn = document.getElementById("btn");
const phone = document.getElementById("phone");
const userId = document.getElementById("userId");
const list = document.getElementById("users");
const updateBtn = document.getElementById("updateBtn");
const submitBtn = document.getElementById("submitBtn");

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
  name.value = "";
  email.value = "";
  phone.value = "";
  axios
    .post("http://localhost:3000/user/add-user", obj)
    .then((res) => {
      //console.log(res);
      let returnedID = res.data.id;
      console.log(returnedID);
      li.id = returnedID;
      list.appendChild(li);
    })
    .catch((err) => console.log(err));
}

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const par = e.target.parentElement;
    let id = par.id;
    console.log(id);
    axios.get(`http://localhost:3000/user/delete/${id}`);
    par.remove();
  }
  if (e.target.classList.contains("edit")) {
    const par = e.target.parentElement;
    let id = par.id;
    axios
      .get(`http://localhost:3000/user/get-user/${id}`) //this will only get the detail of the id back
      .then((res) => {
        let user = res.data;
        name.value = user.name;
        email.value = user.email;
        phone.value = user.phone;
        userId.value = id;

        //hide the submit btn and show the update btn
        submitBtn.style.display = "none";
        updateBtn.style.display = "block";
      })
      .catch();
  }
});

window.addEventListener("DOMContentLoaded", function () {
  axios
    .get("http://localhost:3000/user/get-users")
    .then((res) => {
      for (let obj of res.data) {
        const li = document.createElement("li");
        li.id = obj.id;
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

updateBtn.addEventListener("click", () => {
  const obj = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    id: userId.value,
  };
  const li = document.getElementById(`${userId.value}`);
  axios.post("http://localhost:3000/user/edit-user", obj).then((res) => {
    li.childNodes[0].textContent = `${obj.name}-${obj.email}-${obj.phone}`;
    submitBtn.style.display = "block";
    updateBtn.style.display = "none";
  });
});
