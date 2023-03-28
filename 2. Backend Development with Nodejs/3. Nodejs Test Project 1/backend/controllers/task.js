const Task = require("../models/task");

exports.postAddTask = async (req, res) => {
  try {
    const taskObj = req.body;
    console.log(taskObj);
    const resultTask = await Task.create({
      task: taskObj.task === "" ? null : taskObj.task,
      details: taskObj.details === "" ? null : taskObj.details,
    });
    res.json(resultTask);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.findAll();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const id = req.params.productId;
//     const product = await Product.findByPk(id);
//     const destroyedproduct = await product.destroy();
//     res.status(200).json(destroyedproduct);
//   } catch (error) {
//     res.status(500).json(error); //internal server error
//   }
// };

// exports.getProduct = async (req, res) => {
//   try {
//     const id = req.params.productId;
//     const product = await Product.findByPk(id);
//     res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// exports.postEditProduct = async (req, res) => {
//   try {
//     const obj = req.body;
//     let resultant = 0;
//     const product = await Product.findByPk(obj.id);
//     difference = obj.sellingPrice - product.sellingPrice; //new-old
//     product.sellingPrice = obj.sellingPrice;
//     product.productName = obj.productName;
//     await product.save();
//     res.status(200).json({ difference });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
