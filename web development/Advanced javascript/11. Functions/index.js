// a();

// b();

// function a() {
//   console.log("inside a");
// }

// var b = function () {
//   console.log("inside b");
// };
//Ans: 'inside a'
//      Type error, b not a function untill assigned. In function expression, Only function declaration is hoisted.

//--------------

// function a() {
//   console.log("inside a");
// }

// var b = function abc() {
//   console.log("inside b");
// };

// a();
// b();
// abc();
//Ans: function a and b will run, but abc not defined.
// //----------------

// function fun(a) {
//   console.log(a);
// }

// var b = 10;

// fun(b);
//Ans: 10

// //--------------------

// function fun1() {
//   console.log("a");

//   return () => {
//     console.log("b");
//   };
// }

// fun1();
//Ans: a
// //---------------------

// function fun1() {
//   var a = 10;

//   return () => {
//     a = 20;

//     console.log(a);
//   };
// }

// fun1()();
//Ans 20
// with the help of curring
// //----------------------

// function fun1(a) {
//   return () => {
//     a = a + 20;

//     console.log(a);
//   };
// }

// fun1(10)(20);

//Ans : 30
//you can pass argument even if no parameter

//----------------
// function fun1(a) {
//   return (b) => {
//     a = a + b;

//     console.log(a);
//   };
// }

// fun1(10)(30);
//Ans: 40
// //-------------------------

// function fun1(a) {
//   const fun2 = (b) => {
//     a = a + b;

//     console.log(a);
//   };
// }

// fun1(10)(30);
//Ans: Type error
