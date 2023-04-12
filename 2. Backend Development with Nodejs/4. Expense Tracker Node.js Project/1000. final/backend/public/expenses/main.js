const form = document.getElementById("my-form");
const expenseList = document.getElementById("expenseList");
const premiumBtn = document.getElementById("premiumBtn");
const leadershipSection = document.getElementById("leadershipSection");
const leadershipBtn = document.getElementById("leadershipBtn");
const leadershipList = document.getElementById("leadershipList");
const downloadExpense = document.getElementById("downloadExpense");
const downloadList = document.getElementById("downloadList");
const expenseListPaginate = document.getElementById("expenseListPaginate");
const pageLimit = document.getElementById("pageLimit");

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
      data,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    //improve; If you are not on 1st page, and you are trying to add expense, it will add to the top of current page.
    //To solve this, call the api to get expenses at first page, as recent expenses is already in the db.
    //You need to know the current page. -> get from the pagination buttons

    li.id = expense.data.id;
    const firstChild = expenseList.firstChild;
    if (firstChild) {
      // Insert the new li element before the first child element
      expenseList.insertBefore(li, firstChild);
    } else {
      // If the list is empty, simply append the new li element
      expenseList.appendChild(li);
    }

    e.target.amount.value = "";
    e.target.description.value = "";
    e.target.category.value = "";
  } catch (error) {
    alert("add operation failed, try again");
    console.log(error);
  }
});

expenseList.addEventListener("click", async (e) => {
  try {
    if (e.target.classList.contains("delete")) {
      let li = e.target.parentElement;
      let id = li.id;

      await axios.delete(`http://localhost:3000/expenses/delete/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });

      li.remove();
    }
  } catch (error) {
    alert("deletion failed");
    console.log(error);
  }
});

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function premiumFeaturesDisplay() {
  premiumBtn.classList.remove("nonPremium");
  premiumBtn.classList.add("premiumUser");
  premiumBtn.innerHTML = "Premium User";
  leadershipSection.style.display = "block";
  downloadExpense.style.display = "block";
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const decodeToken = parseJwt(token);
    const ispremiumuser = decodeToken.ispremiumuser;
    if (ispremiumuser) {
      premiumFeaturesDisplay();
    }

    const res = await axios.get(
      `http://localhost:3000/expenses/get-Paginated-expenses/?pageNo=1&limit=${localStorage.getItem(
        "listRows"
      )}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    displayList(res, expenseList, expenseListPaginate);
  } catch (error) {
    alert("failed to fetch data ");
    console.log(error);
  }
});

function displayList(res, list, listPaginate) {
  const expenses = res.data.rows;
  paginateButtons(res, listPaginate);

  list.innerHTML = "";
  for (let expense of expenses) {
    const li = document.createElement("li");
    li.innerHTML = `${expense.category} || ${expense.description} ||  ${expense.amount} `;

    const del = document.createElement("BUTTON");
    del.innerHTML = "Delete";
    del.classList.add("delete");
    del.classList.add("actionBtn");
    li.appendChild(del);

    li.id = expense.id;
    list.appendChild(li);
  }
}

function paginateButtons(res, listPaginate) {
  listPaginate.innerHTML = "";
  const { hasNextPage, nextPage } = res.data;
  const { currentPage, hasPrevPage, prevPage } = res.data;
  if (hasPrevPage) {
    const buttonPrev = document.createElement("button");
    buttonPrev.classList.add("paginateButtonStyle");
    buttonPrev.innerHTML = prevPage;
    listPaginate.appendChild(buttonPrev);
  }
  const buttonCur = document.createElement("button");
  buttonCur.innerHTML = currentPage;
  buttonCur.classList.add("paginateButtonStyle");
  listPaginate.appendChild(buttonCur);
  if (hasNextPage) {
    const buttonNext = document.createElement("button");
    buttonNext.innerHTML = nextPage;
    buttonNext.classList.add("paginateButtonStyle");
    listPaginate.appendChild(buttonNext);
  }
}

premiumBtn.addEventListener("click", async () => {
  try {
    const result = await axios.get(
      "http://localhost:3000/purchase/buy-premium",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    const options = {
      key: result.data.key_id,
      order_id: result.data.order.id,
      handler: async (response) => {
        const update = await axios.post(
          "http://localhost:3000/purchase/update-premium",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        alert("You are a Premium User Now");
        localStorage.setItem("token", update.data.token);
        premiumFeaturesDisplay();
      },
    };

    const rzp = new Razorpay(options);
    console.log("hello");
    rzp.open();
    rzp.on("payment.failed", function (response) {
      console.log(response);
      alert("payment failed");
    });
  } catch (error) {
    alert("something went wrong 123");
  }
});

leadershipBtn.addEventListener("click", async () => {
  if (leadershipList.style.display == "none") {
    leadershipList.style.display = "block";
    leadershipBtn.innerHTML = "Close Board";
    const result = await axios.get(
      "http://localhost:3000/premiumFeatures/leadership"
    );
    const users = result.data;
    for (let user of users) {
      const li = document.createElement("li");
      li.innerHTML = `${user.name} || ${user.totalexpense}  `;
      leadershipList.appendChild(li);
    }
  } else {
    while (leadershipList.firstChild) {
      // Loop through all the child elements of <ul>
      leadershipList.removeChild(leadershipList.firstChild); // Remove each child element (i.e., <li> elements)
    }
    leadershipList.style.display = "none";
    leadershipBtn.innerHTML = "Leadership Board";
  }
});

async function download() {
  try {
    //1.limit the top 5 downloads, with most recent at the top
    //2.Add logic to close the button and, on open, send request

    console.log("in download function");
    const response = await axios.get(
      "http://localhost:3000/expenses/download",
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    // let a = document.createElement("a");
    // a.href = response.data.fileUrl;
    // console.log(a.href);
    // a.download = "myexpense.csv";
    // a.click();
    const allExpenses = response.data.allExpenses;
    //remove all the earlier expenses
    downloadList.innerHTML = "";
    for (let expense of allExpenses) {
      let li = document.createElement("li");
      //li.innerHTML = expense.name;
      let a = document.createElement("a");
      a.href = expense.link;
      a.textContent = expense.name;
      li.appendChild(a);
      downloadList.appendChild(li);
    }
  } catch (error) {
    console.log(error);
  }
}

//paginate buttons on expenseList
expenseListPaginate.addEventListener("click", async (e) => {
  if (e.target.classList.contains("paginateButtonStyle")) {
    const pageNo = e.target.innerHTML;
    const res = await axios.get(
      `http://localhost:3000/expenses/get-Paginated-expenses/?pageNo=${pageNo}&limit=${localStorage.getItem(
        "listRows"
      )}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );

    displayList(res, expenseList, expenseListPaginate);
  }
});

//leadship board:
//1. when pressed button, display only first 5 downloads (you need to change backend),
//2. you can reuse displayList(res, leadershipList, leadershipListPaginate)
//3. create a eventlistner for leadershipListPaginate

//similar for downloads.

pageLimit.addEventListener("change", (event) => {
  const selectedValue = event.target.value;
  console.log(`Selected value: ${selectedValue}`);
  localStorage.setItem("listRows", selectedValue);
});
const storedValue = localStorage.getItem("listRows");
if (storedValue) {
  pageLimit.value = storedValue;
}
