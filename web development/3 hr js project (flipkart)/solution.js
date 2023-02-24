let form = document.getElementById("form");
let items = document.getElementById("myList");
let total = document.getElementById("total");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let pid = document.getElementById("productID").value;
  let sp = document.getElementById("sp").value;
  let pname = document.getElementById("productName").value;
  let data = {
    productid: pid,
    sellingPrice: sp,
    productName: pname,
  };
  if (localStorage.getItem(pid)) {
    return;
  }

  total.innerHTML = parseInt(total.innerHTML) + parseInt(sp);
  localStorage.setItem(pid, JSON.stringify(data));

  const li = document.createElement("li");
  li.id = pid;
  li.innerHTML = `${pname} - ${sp}`;

  const del = document.createElement("BUTTON");
  del.innerHTML = "delete";
  del.classList.add("delete");

  li.appendChild(del);
  items.appendChild(li);
});

items.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let par = e.target.parentElement; //li
    localStorage.removeItem(par.id);
    let sp = par.childNodes[0].textContent.split(" - ")[1];
    console.log(sp);
    total.innerHTML = parseInt(total.innerHTML) - parseInt(sp);
    par.remove();
  }
});

document.addEventListener("DOMContentLoaded", () => localStorage.clear());
