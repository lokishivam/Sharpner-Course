// ELEMENT SELECTORS

// Single Element Selectors
// console.log(document.getElementById("my-form"));
// console.log(document.querySelector(".container"));

// // Multiple Element Selectors
// console.log(document.querySelectorAll(".item"));

// const items = document.querySelectorAll(".item");
// items.forEach((item) => console.log(item));

// MANIPULATING THE DOM
const ul = document.querySelector(".items");
// ul.remove();
// ul.lastElementChild.remove();
ul.firstElementChild.textContent = "Hello";
//Note that childNodes returns all child nodes, including text nodes and comment nodes, not just child elements.
//If you only want to get child elements, you can use the children property instead.
ul.firstElementChild.style.color = "green";
ul.children[1].style.color = "yellow";

// ul.children[1].innerText = "Brad";
// ul.lastElementChild.innerHTML = "<h1>Hello</h1>";

// const btn = document.querySelector(".btn");
// btn.style.background = 'red';
