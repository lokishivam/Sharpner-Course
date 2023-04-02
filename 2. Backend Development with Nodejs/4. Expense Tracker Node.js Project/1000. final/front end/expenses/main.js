const form = document.getElementById("my-form");
const expenseList = document.getElementById("expenseList");
const premiumBtn = document.getElementById("premiumBtn");
const leadershipSection = document.getElementById("leadershipSection");
const leadershipBtn = document.getElementById("leadershipBtn");
const leadershipList = document.getElementById("leadershipList");

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
    li.id = expense.data.id;
    expenseList.appendChild(li);

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
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const decodeToken = parseJwt(token);
    console.log(decodeToken);
    const ispremiumuser = decodeToken.ispremiumuser;
    if (ispremiumuser) {
      premiumFeaturesDisplay();
    }
    const res = await axios.get("http://localhost:3000/expenses/get-expenses", {
      headers: { token: localStorage.getItem("token") },
    });
    const expenses = res.data;

    for (let expense of expenses) {
      const li = document.createElement("li");
      li.innerHTML = `${expense.category} || ${expense.description} ||  ${expense.amount} `;

      const del = document.createElement("BUTTON");
      del.innerHTML = "Delete";
      del.classList.add("delete");
      del.classList.add("actionBtn");
      li.appendChild(del);

      li.id = expense.id;
      expenseList.appendChild(li);
    }
  } catch (error) {
    alert("failed to fetch data ");
    console.log(error);
  }
});

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
