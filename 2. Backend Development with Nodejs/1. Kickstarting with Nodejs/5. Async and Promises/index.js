// console.log("a");
// console.log("b");
// setTimeout(() => console.log("c"), 3000);
// console.log("d");

// //----------------------

// console.log("a");
// console.log("b");
// setTimeout(() => console.log("c"), 3000);

// setTimeout(() => console.log("d"), 0);
// console.log("e");

//----------------

console.log("a");
console.log("b");

async function fun() {
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("c"), 3000);
  });

  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("d"), 0);
  });

  const res1 = await p1;
  console.log(res1);

  const res2 = await p2;
  console.log(res2);

  console.log("e");
}

fun();
