// //1) which function would get in the call stack first

// function fun1() {
//   console.log(a);
// }

// function fun2() {
//   console.log(b);
// }

// fun2();

// fun1();
//Ans: fun2 and then fun1
// //--------------------------

// //2) Which function would be picked by the Global Execution Context first ?

// function fun1() {
//   console.log(a);
// }

// function fun2() {
//   console.log(b);
// }

// fun2();

// fun1();
//Ans: fun2
// //--------------------------------

// function fun1() {
//   console.log("a");
// }

// function fun2() {
//   console.log(b);
// }

// setTimeout(fun2, 1000);

// fun1();

// //-------------------------------

// function fun1() {
//   console.log("a");
// }

// function fun2() {
//   console.log(b);
// }

// document.getElementById("somebutton").addEventListener("click", fun1);

// fun2();
