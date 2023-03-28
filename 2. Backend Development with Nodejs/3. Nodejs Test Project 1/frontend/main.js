let form = document.getElementById("my-form");
let remainingList = document.getElementById("remainingList");
let completedList = document.getElementById("completedList");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let task = e.target.task.value;
    let details = e.target.details.value;
    let data = {
      task,
      details,
    };

    const li = document.createElement("li");
    li.innerHTML = `Task: ${task}     ||   Details: ${details}`;

    const del = document.createElement("BUTTON");
    del.innerHTML = "Delete";
    del.classList.add("delete");
    del.classList.add("actionBtn");
    li.appendChild(del);

    const done = document.createElement("BUTTON");
    done.innerHTML = "Done";
    done.classList.add("done");
    done.classList.add("actionBtn");
    li.appendChild(done);

    const resTaskObj = await axios.post(
      "http://localhost:3000/tasks/add-task",
      data
    );
    li.id = resTaskObj.data.id;
    remainingList.appendChild(li);

    e.target.task.value = "";
    e.target.details.value = "";
  } catch (error) {
    alert("operation failed, try again");
    console.log(error);
  }
});

// remainingList.addEventListener("click", async (e) => {
//   try {
//     if (e.target.classList.contains("delete")) {
//       let li = e.target.parentElement;
//       let id = li.id;
//       // let sellingPrice = li.childNodes[0].textContent.split(" - ")[1];

//       const res = await axios.delete(
//         `http://localhost:3000/products/delete/${id}`
//       );
//       console.log(res.data);
//       total.innerHTML =
//         parseInt(total.innerHTML) - parseInt(res.data.sellingPrice);
//       li.remove();
//     }

//     if (e.target.classList.contains("edit")) {
//       const li = e.target.parentElement;
//       let id = li.id;
//       const res = await axios.get(
//         `http://localhost:3000/products/get-product/${id}`
//       );

//       let product = res.data;
//       form.sellingPrice.value = product.sellingPrice;
//       form.productName.value = product.productName;
//       productId.value = id;

//       submitBtn.style.display = "none";
//       updateBtn.style.display = "block";
//     }
//   } catch (error) {
//     alert("failed");
//     console.log(error);
//   }
// });

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const res = await axios.get("http://localhost:3000/products/get-products");
//     const products = res.data;

//     for (let product of products) {
//       const li = document.createElement("li");
//       li.innerHTML = `Product: ${product.productName}  || Price: ${product.sellingPrice}/- rs`;

//       const del = document.createElement("BUTTON");
//       del.innerHTML = "Delete";
//       del.classList.add("delete");
//       del.classList.add("actionBtn");
//       li.appendChild(del);

//       const edit = document.createElement("BUTTON");
//       edit.innerHTML = "Edit";
//       edit.classList.add("edit");
//       edit.classList.add("actionBtn");
//       li.appendChild(edit);

//       li.id = product.id;
//       items.appendChild(li);
//       total.innerHTML =
//         parseInt(total.innerHTML) + parseInt(product.sellingPrice);
//     }
//   } catch (error) {
//     alert("failed to fetch data on reload");
//     console.log(error);
//   }
// });

// updateBtn.addEventListener("click", async () => {
//   const obj = {
//     sellingPrice: form.sellingPrice.value,
//     productName: form.productName.value,
//     id: productId.value,
//   };

//   const li = document.getElementById(`${productId.value}`);
//   const result = await axios.post(
//     "http://localhost:3000/products/edit-product",
//     obj
//   );

//   li.childNodes[0].textContent = `Product: ${obj.productName}  || Price: ${obj.sellingPrice}/- rs`;
//   //console.log(parseInt(total.innerHTML) + result.data.difference);
//   total.innerHTML = parseInt(total.innerHTML) + result.data.difference;

//   submitBtn.style.display = "block";
//   updateBtn.style.display = "none";

//   form.sellingPrice.value = "";
//   form.productName.value = "";
//   productId.value = "";
// });
