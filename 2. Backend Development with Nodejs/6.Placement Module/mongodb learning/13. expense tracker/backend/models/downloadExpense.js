const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const downloadExpenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("DownloadExpense", downloadExpenseSchema);
