a();

b();

function a() {
  console.log("inside a");
}

var b = function () {
  console.log("inside b");
};

//--------------

function a() {
  console.log("inside a");
}

var b = function abc() {
  console.log("inside b");
};

a();

abc();

//----------------

function fun(a) {
  console.log(a);
}

var b = 10;

fun(b);

//--------------------

function fun1() {
  console.log("a");

  return () => {
    console.log("b");
  };
}

fun1();

//---------------------

function fun1() {
  var a = 10;

  return () => {
    a = 20;

    console.log(a);
  };
}

fun1()();

//----------------------

function fun1(a) {
  return () => {
    a = a + 20;

    console.log(a);
  };
}

fun1(10)(20);

//----------------
function fun1(a) {
  return (b) => {
    a = a + b;

    console.log(a);
  };
}

fun1(10)(30);

//-------------------------

function fun1(a) {
  const fun2 = (b) => {
    a = a + b;

    console.log(a);
  };
}

fun1(10)(30);
