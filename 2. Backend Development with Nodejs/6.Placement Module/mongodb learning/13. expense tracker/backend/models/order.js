const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: String,
  },

  purchaseStatus: {
    type: String,
  },

  paymentId: {
    type: String,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
