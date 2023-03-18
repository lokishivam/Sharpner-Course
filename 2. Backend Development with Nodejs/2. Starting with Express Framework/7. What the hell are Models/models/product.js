const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(path.join(rootDir, "data", "productdata.json"), (err, data) => {
      //Adding new object to json array of objects in the datafile
      let products = [];
      if (!err) {
        products = JSON.parse(data);
      }
      products.push(this);
      fs.writeFile(
        path.join(rootDir, "data", "productdata.json"),
        JSON.stringify(products),
        (err) => {
          console.log("hi" + err);
        }
      );
    });
  }

  static fetchAll(cb) {
    fs.readFile(path.join(rootDir, "data", "productdata.json"), (err, data) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(data));
      }
    });
  }
};
