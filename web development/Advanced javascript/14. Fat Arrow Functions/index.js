// var fun = (a) => a;
// var a = 10;
// console.log(fun(a));
//Ans: 10
//--------------

// var fun = (a) => a;
// console.log(fun(a));
// var a = 10;
//Ans:undefined
// //-------------------

// var fun = (a) => {
//   a;//no return statetment
// };

// var a = 10;
// console.log(fun(a));
//Ans: undefined
// //------------------

// var fun = (a, b) => {
//   var sum = a + b;
//   return sum;
// };

// var a = 10;
// var b = 20;
// console.log(fun(a, b));
//Ans: 30
// //----------------------

// var fun =( a, b) =>
// var sum = a + b
// return sum
// var a =10;
// var b = 20
// console.log(fun(a, b))
//Ans: syntax error
// //--------------------------

// var student = function (name) { //kind of a constructor function
//   this.name = name;

//   function printName() { //this is not a part of object
//     console.log(this.name);
//   }
//   printName();
// };

// var yash = new student("yash");
//Ans:undefined
/*When new student("yash") is called, a new student object is created with the name property set to "yash". 
The printName function is then called, but because it is defined inside the student function and not as a method of the student object, 
the this keyword in console.log(this.name) will refer to the global window object.
 Therefore, the output will be undefined, since window.name is not defined.
 */

//  var student = function (name) {
//     this.name = name; //global window

//     this.printName = function () {
//       console.log(this.name);
//     };
//     this.printName();
//   };

//   var yash = new student("yash");

// //Ans:yash

// //--------------------------------

// var student = function (name) {
//   this.name = name;
//   var printName = () => {
//     //arrow function but its not a function of a object
//     console.log(this.name); //this will be parents this,
//   };
//   printName();
// };
// var yash = new student("yash");

/*In this code, the arrow function syntax () => {} is used to define the printName function. 
Because arrow functions do not bind their own this, this will refer to the context in which the arrow function is defined.
In this case, this will refer to the instance of the student object that is created when new student("yash") is called.
Therefore, the output of the code will be: */
