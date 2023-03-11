function addToCart() {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle("items added to the cart");
    }, 3000); //it takes 3 secs to add to cart
  });
}

function checkout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("items checked out");
    }, 1000); //it takes 1 sec to checkout
  });
}

function payment() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("payment is done");
    }, 2000);
  });
}

addToCart() //this function will execute and return a promise.
  .then((res) => {
    console.log(res);
    return checkout();
  })
  .then((res) => {
    console.log(res);
    return payment();
  })
  .then((res) => {
    console.log(res);
  });

//As the promise returned by 'addToCart' method is still pending, the below line will get executed.
console.log("heloooooooooooooooooo");

//Adding error handling with the help of catch.

// addToCart()
//   .then((res) => {
//     console.log(res);
//     return checkout();
//   })
//   .catch(() => "something went wrong with addtocart")
//   .then((res) => {
//     console.log(res);
//     return payment();
//   })
//   .catch(() => "something went wrong with payment")
//   .then((res) => {
//     console.log(res);
//   });
