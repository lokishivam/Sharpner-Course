const orders = document.getElementById("orders");

async function formSubmitHandler(e) {
  //1. get data from the form and store it in an object.
  //2. pass the object to server endpoint which will return a new object with _id
  //3. create the li and add the obj details in it
  //4.dont forget to add _id to li, as its helpful while deleting from the server.

  //here clicking on submit is clicking on form, so target is form itself
  try {
    e.preventDefault();
    const obj = {
      dish: e.target.dish.value,
      price: e.target.price.value,
      table: e.target.tableOptions.value,
    };

    let res = await axios.post(
      "https://crudcrud.com/api/dabfa82acc784b6dba68842885ec9165/orders",
      obj
    );
    displayOrder(res.data); //displayOrder will create li and add details to it and display it.
  } catch {
    alert("failed to add the data");
  }

  //everything will wait untill await is completed.
  e.target.dish.value = "";
  e.target.price.value = "";
  e.target.tableOptions.value = "";
}

function displayOrder(obj) {
  //every table has a list that has an id to access it.
  //we have kept the table's(option selector) value similar to table ul's id, so as to get tableList easily.
  const ul = document.getElementById(obj.table);
  const li = document.createElement("li");
  li.id = obj._id; //this helps in quick deleting any object from the server.
  li.innerHTML = `${obj.dish} ${obj.price} ${obj.table}  `;
  const delButton = document.createElement("button");
  delButton.innerHTML = "delete";
  delButton.className = "delete";
  li.appendChild(delButton);
  ul.appendChild(li);
}

//delete
orders.addEventListener("click", async (e) => {
  try {
    if (e.target.className == "delete") {
      //1.get target's par i.e. li
      //2. get id of par
      //3. remove li from ui
      //4. remove from server

      const par = e.target.parentElement;
      const id = par.id;
      par.remove();
      axios.delete(
        `https://crudcrud.com/api/dabfa82acc784b6dba68842885ec9165/orders/${id}`
      );
    }
  } catch {
    alert("data not deleted");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  //1.on dom load, get the [obj]
  //2.forloop(displaying every dish to its respective table )

  try {
    let res = await axios.get(
      `https://crudcrud.com/api/dabfa82acc784b6dba68842885ec9165/orders`
    );
    for (obj of res.data) {
      //console.log(obj);
      displayOrder(obj);
    }
  } catch {
    alert("failed to load the data");
  }
});
