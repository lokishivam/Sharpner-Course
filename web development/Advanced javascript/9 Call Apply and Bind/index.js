// //-----------
// var obj = {
//   val: 100,
// };

// function fun() {
//   console.log(this.val);
// }

// fun();
//Ans: undefined, because we are calling a property that doesnot exist,
// and js dont throw error instead outputs undefined.

// //--------------------

// var obj = {
//   val: 100,
// };

// function fun() {
//   console.log(this.val);
// }

// obj.fun();
//Ans: Not obj.fun() not a function

//------------------

// var obj = {
//   val: 100,
// };

// function fun() {
//   console.log(this.val);
// }

// fun().call(obj);
//Ans: error, the way to write is fun.call(obj) this would give 100
//----------------------

// var obj = {
//   val: 100,
// };

// function fun(a) {
//   console.log(this.val + a);
// }

// fun.call(obj);
//Ans: NaN, a is undefined

//---------------------------

// var obj = {
//   val: 100,
// };

// function fun(a) {
//   console.log(this.val + a);
// }

// fun.call(obj, 3);

//--------------------

// var obj = {
//   val: 100,
// };

// function fun(a, b, c) {
//   console.log(this.val + a + b + c);
// }

// fun.call(obj, 3, 4, 5);
//Ans: 112
//---------------------

// var obj = {
//   val: 100,
// };

// function fun(a, b, c) {
//   console.log(a);
//   console.log(b);
//   console.log(c);
// }
// fun.call(obj, [3, 4, 5]);

//Ans: only array is passed. we need to use apply
//------------------

// var obj = {
//   val: 100,
// };

// function fun(a, b, c) {
//   console.log(this.val + a + b + c);
// }

// fun.apply(obj, [3, 4, 5]);
// //Ans: 'apply' will help the parameters.

// //--------------------------------
// var obj = {
//   val: 100,
// };

// function fun(a, b, c) {
//   console.log(this.val + a + b + c);
// }

// const fun2 = fun.bind(obj);

// fun2(1, 2, 3);
//Ans: 106
