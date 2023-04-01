const RazorPay = require("razorpay");
const userController = require("../controllers/user");
const Order = require("../models/order");

exports.getBuyPremium = async (req, res) => {
  try {
    const user = req.user;
    console.log("done1");
    const razorpay = new RazorPay({
      key_id: "rzp_test_7J8QCAqfu7plWw",
      key_secret: "dLWsC6lcV4gYPMHI93wToEns",
    });
    console.log("done2");

    const order = await razorpay.orders.create({
      amount: 1000,
      currency: "INR",
    });

    console.log(order);

    //after razorPay order
    await user.createOrder({
      orderId: order.id,
      purchaseStatus: "PENDING",
    });
    console.log("done5");
    res.json({ order, key_id: razorpay.key_id });
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.postUpdatePremium = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ where: { orderId: order_id } }); //2
    const promise1 = order.update({
      paymentId: payment_id,
      purchaseStatus: "SUCCESSFUL",
    });
    const promise2 = req.user.update({ ispremiumuser: true });

    Promise.all([promise1, promise2]).then((response) => {
      res.status(200).json({ token: userController.getToken(userId, true) });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
