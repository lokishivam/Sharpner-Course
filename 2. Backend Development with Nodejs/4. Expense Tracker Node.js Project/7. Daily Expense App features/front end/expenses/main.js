let form = document.getElementById("my-form");
let expenseList = document.getElementById("expenseList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    let amount = e.target.amount.value;
    let description = e.target.description.value;
    let category = e.target.category.value;
    let data = {
      amount,
      description,
      category,
    };

    const li = document.createElement("li");
    li.innerHTML = `${category} || ${description} || ${amount}`;

    const del = document.createElement("BUTTON");
    del.innerHTML = "Delete";
    del.classList.add("delete");
    del.classList.add("actionBtn");
    li.appendChild(del);

    const expense = await axios.post(
      "http://localhost:3000/expenses/add-expense",
      data
    );
    li.id = expense.data.id;
    expenseList.appendChild(li);

    e.target.amount.value = "";
    e.target.description.value = "";
    e.target.category.value = "";
  } catch (error) {
    alert("operation failed, try again");
    console.log(error);
  }
});

expenseList.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("delete")) {
      let li = e.target.parentElement;
      let id = li.id;

      await axios.delete(`http://localhost:3000/expenses/delete/${id}`);

      li.remove();
    }
  } catch (error) {
    alert("failed");
    console.log(error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/expenses/get-expenses");
    const expenses = res.data;

    for (let expense of expenses) {
      const li = document.createElement("li");
      li.innerHTML = `${expense.category}  ${expense.description}  ${expense.amount} `;

      const del = document.createElement("BUTTON");
      del.innerHTML = "Delete";
      del.classList.add("delete");
      del.classList.add("actionBtn");
      li.appendChild(del);

      li.id = expense.id;
      expenseList.appendChild(li);
    }
  } catch (error) {
    alert("failed to fetch data on reload");
    console.log(error);
  }
});
