//The order of shopping addToCart -> checkout -> payment
//Every task is written in a callback and they take some time to complete.
//Trying seqvential way.

// function addToCart() {
//   setTimeout(() => {
//     console.log("items added to the cart");
//   }, 3000); //it takes 3 secs to add to cart
// }

// function checkout() {
//   setTimeout(() => {
//     console.log("items checked out");
//   }, 1000); //it takes 1 sec to checkout
// }

// function payment() {
//   setTimeout(() => {
//     console.log("payment is done");
//   }, 2000);
// }

// addToCart();
// checkout();
// payment();
//Ans: order is messed,
// items checked out
// payment is done
// items added to the cart

//-------------------
//Lets try with nesting callbacks

function addToCart(callback) {
  setTimeout(() => {
    console.log("items added to the cart");
    callback();
  }, 3000); //it takes 3 secs to add to cart
}

function checkout(callback) {
  setTimeout(() => {
    console.log("items checked out");
    callback();
  }, 1000); //it takes 1 sec to checkout
}

function payment() {
  setTimeout(() => {
    console.log("payment is done");
  }, 2000);
}

addToCart(function () {
  checkout(function () {
    payment();
  });
});

//Ans:
// items added to the cart
// items checked out
// payment is done

//The ans is right but it can lead to callback hell and inversion of control.
