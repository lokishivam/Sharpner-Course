const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(productId, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const productIndex = cart.products.findIndex((p) => p.id === productId);
      if (productIndex >= 0) {
        cart.products[productIndex] = {
          id: productId,
          quant: cart.products[productIndex].quant + 1,
        };
      } else {
        cart.products.push({ id: productId, quant: 1 });
      }

      cart.totalPrice += +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
