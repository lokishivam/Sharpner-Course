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
      resolve("items checked out");
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

async function controller() {
  let addedTocart = await addToCart();
  console.log(addedTocart);

  let checkedout = await checkout();
  console.log(checkedout);

  let pay = await payment();
  console.log(pay);
}

controller();
