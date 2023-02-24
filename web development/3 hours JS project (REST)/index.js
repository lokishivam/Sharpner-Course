const orders = document.getElementById("orders");

function formSubmitHandler(e) {
  //1. get data from the form
  //2. pass it to server endpoint which will return the object with _id
  //3. create the li and add the obj details in it
  //4.dont forget to add _id to li, as its helpful while deleting from the server.

  //here clicking on submit is clicking on form, so target is form itself
  e.preventDefault();
  const obj = {
    dish: e.target.dish.value,
    price: e.target.price.value,
    table: e.target.tableOptions.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/orders",
      obj
    )
    .then((res) => displayOrder(res.data)); //displayOrder will create li and add details to it and display it.

  e.target.dish.value = "";
  e.target.price.value = "";
  e.target.tableOptions.value = "";
}

function displayOrder(obj) {
  //every table has a list that has an id to access it.
  //we have kept the table's(option selector) value similar to table ul's id, so as to get tableList easily.
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
      `https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/orders/${id}`
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //1.on dom load, get the [obj]
  //2.for(addind every displaying to respective table )
  axios
    .get(`https://crudcrud.com/api/f805b51e95cc4075be396adf1bd66a86/orders`)
    .then((res) => {
      //console.log(res.data);
      for (obj of res.data) {
        //console.log(obj);
        displayOrder(obj);
      }
    });
});
