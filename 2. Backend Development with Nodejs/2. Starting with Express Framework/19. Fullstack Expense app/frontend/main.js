let form = document.getElementById("my-form");
let items = document.getElementById("myList");
let total = document.getElementById("total");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let sellingPrice = e.target.sellingPrice.value;
    let productName = e.target.productName.value;
    let data = {
      sellingPrice,
      productName: productName,
    };

    const li = document.createElement("li");
    li.innerHTML = `${productName} - ${sellingPrice}`;

    const edit = document.createElement("BUTTON");
    edit.innerHTML = "Edit";
    edit.classList.add("edit");
    li.appendChild(edit);

    const del = document.createElement("BUTTON");
    del.innerHTML = "Delete";
    del.classList.add("delete");
    li.appendChild(del);

    const product = await axios.post(
      "http://localhost:3000/products/add-product",
      data
    );
    li.id = product.data.id;
    items.appendChild(li);
    total.innerHTML = parseInt(total.innerHTML) + parseInt(sellingPrice);

    e.target.sellingPrice.value = "";
    e.target.productName.value = "";
  } catch (error) {
    alert("operation failed, try again");
    console.log(error);
  }
});

items.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("delete")) {
      let li = e.target.parentElement;
      let id = li.id;
      let sellingPrice = li.childNodes[0].textContent.split(" - ")[1];

      await axios.delete(`http://localhost:3000/products/delete/${id}`);
      total.innerHTML = parseInt(total.innerHTML) - parseInt(sellingPrice);
      li.remove();
    }

    if (e.target.classList.contains("edit")) {
    }
  } catch (error) {}
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/products/get-products");
    const products = res.data;

    for (let product of products) {
      const li = document.createElement("li");
      li.innerHTML = `${product.productName} - ${product.sellingPrice}`;

      const edit = document.createElement("BUTTON");
      edit.innerHTML = "Edit";
      edit.classList.add("edit");
      li.appendChild(edit);

      const del = document.createElement("BUTTON");
      del.innerHTML = "Delete";
      del.classList.add("delete");
      li.appendChild(del);

      li.id = product.id;
      items.appendChild(li);
      total.innerHTML =
        parseInt(total.innerHTML) + parseInt(product.sellingPrice);
    }
  } catch (error) {
    alert("failed to fetch data on reload");
    console.log(error);
  }
});
