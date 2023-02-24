const btn = document.querySelector(".btn");
//   // Put DOM elements into variables
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

// EVENTS

// Mouse Event
btn.addEventListener("mouseover", (e) => {
  console.log(e);
  e.preventDefault();
  console.log(e.target.className);
  document.getElementById("my-form").style.background = "#ccc";
  document.querySelector("body").classList.add("bg-dark");
  //classList is a property of a DOM element that represents a collection of the CSS classes that are currently applied to that element.
  // The classList property is available on all DOM elements, including HTML elements.
  //ul.lastElementChild.innerHTML = "<h1>Changed</h1>";
});

btn.addEventListener("mouseout", (e) => {
  console.log(e);
  e.preventDefault();
  // console.log(e.target.className);
  document.getElementById("my-form").style.background = "#f4f4f4";
  document.querySelector("body").classList.remove("bg-dark");
  //classList is a property of a DOM element that represents a collection of the CSS classes that are currently applied to that element.
  // The classList property is available on all DOM elements, including HTML elements.
  //ul.lastElementChild.innerHTML = "<h1>Changed</h1>";
});

// Keyboard Event
// nameInput.addEventListener("input", (e) => {
//   document.querySelector(".container").append(nameInput.value);
// });

//   // USER FORM SCRIPT

//   // Listen for form submit
myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === "" || emailInput.value === "") {
    // alert('Please enter all fields');
    msg.classList.add("error");
    msg.innerHTML = "Please enter all fields";

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement("li");

    // Add text node with input values
    // li.appendChild(
    //   document.createTextNode(`${nameInput.value}: ${emailInput.value}`)
    // );

    // Add HTML
    li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

    // Append to ul
    userList.appendChild(li);

    // Clear fields
    nameInput.value = "";
    emailInput.value = "";
  }
}
