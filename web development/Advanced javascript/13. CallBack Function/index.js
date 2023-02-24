// setTimeout(() => console.log("timer expired"), 1000);

// function x(y) {
//   console.log("inside x");

//   y();
// }

// x(function y() {
//   console.log("inside y");
// });

//Ans:
// inside x
// inside y
// timer expired
//----------------------

// setTimeout(() => console.log("timer1 expired"), 1000);
// setTimeout(() => console.log("timer2 expired"), 0);

// function x(y) {
//   console.log("inside x");

//   y();
// }

// x(function y() {
//   console.log("inside y");
// });
//Ans:
// inside x
// inside y
// timer2 expired it will be added to the call(execution context) stack after stack is empty
// timer1 expired
// //--------------------------------

// setTimeout(() => console.log("timer1 expired"), 1000);
// setTimeout(() => console.log("timer2 expired"), 0);

// function x(y) {
//   console.log("inside x");

//   y();
// }

// x(function y() {
//   setTimeout(() => console.log("inside y"), 0);
// });
// //Ans:
// inside x
// timer2 expired
// inside y
// timer1 expired
