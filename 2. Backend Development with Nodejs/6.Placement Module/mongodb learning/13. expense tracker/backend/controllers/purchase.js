const RazorPay = require("razorpay");
const userController = require("../controllers/user");
const Order = require("../models/order");
require("dotenv").config();

exports.getBuyPremium = async (req, res) => {
  try {
    const user = req.user;

    const razorpay = new RazorPay({
      key_id: process.env.RAZORPAY_API_KEYID,
      key_secret: process.env.RAZORPAY_API_KEYSECRET,
    });

    const order = await razorpay.orders.create({
      amount: 1000,
      currency: "INR",
    });

    console.log(order);

    //after razorPay order
    const myOrder = new Order({
      orderId: order.id,
      purchaseStatus: "PENDING",
      userId: user._id,
    });
    await myOrder.save();

    res.json({ order, key_id: razorpay.key_id });
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
};

exports.postUpdatePremium = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ orderId: order_id });

    order.paymentId = payment_id;
    order.purchaseStatus = "SUCCESSFUL";
    const promise1 = order.save();

    req.user.ispremiumuser = true;
    const promise2 = req.user.save();

    Promise.all([promise1, promise2]).then((response) => {
      res
        .status(200)
        .json({ token: userController.getToken(req.user._id, true) });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
