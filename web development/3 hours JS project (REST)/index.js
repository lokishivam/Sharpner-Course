const orders = document.getElementById("orders");

orders.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    //1.get target's par i.e. li
    //2. get id of par
    //3. remove li from ui
    //4. remove from server

    const par = e.target.parentElement;
    const id = par.id;
    par.remove();
    axios.delete(
      `https://crudcrud.com/api/a1b41e3f17dd49dc85dcbdcbb344ee6f/orders/${id}`
    );
  }
});

function formSubmitHandler(e) {
  //here clicking on submit is clicking on form, so target is form itself
  e.preventDefault();
  const obj = {
    dish: e.target.dish.value,
    price: e.target.price.value,
    table: e.target.tableOptions.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/a1b41e3f17dd49dc85dcbdcbb344ee6f/orders",
      obj
    )
    .then((res) => displayOrder(res.data));

  e.target.dish.value = "";
  e.target.price.value = "";
  e.target.tableOptions.value = "";
}

function displayOrder(obj) {
  const ul = document.getElementById(obj.table);
  const li = document.createElement("li");
  li.id = obj._id;
  li.innerHTML = `${obj.dish} ${obj.price} ${obj.table}  `;
  const delButton = document.createElement("button");
  delButton.innerHTML = "delete";
  delButton.className = "delete";
  li.appendChild(delButton);
  ul.appendChild(li);
}

document.addEventListener("DOMContentLoaded", () => {
  //1.on dom load, get the [obj]
  //2.for(addind every displaying to respective table )
  axios
    .get(`https://crudcrud.com/api/a1b41e3f17dd49dc85dcbdcbb344ee6f/orders`)
    .then((res) => {
      console.log(res.data);
      for (obj of res.data) {
        console.log(obj);
        displayOrder(obj);
      }
    });
});
