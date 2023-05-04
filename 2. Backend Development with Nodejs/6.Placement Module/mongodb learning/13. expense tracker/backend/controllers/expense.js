const mongoose = require("mongoose");
const Expense = require("../models/expense");

const AWS = require("aws-sdk");
require("dotenv").config();

exports.postAddExpense = async (req, res) => {
  //let transaction = await mongoose.startSession(); //returns a promise that resolves into transaction object
  try {
    const user = req.user;
    const { amount, description, category } = req.body;

    const expense = new Expense({
      amount: amount,
      description: description,
      category: category,
      userId: user._id,
    });
    await expense.save();

    (user.totalexpense = user.totalexpense
      ? parseInt(user.totalexpense) + parseInt(amount)
      : amount),
      await user.save();

    //await transaction.commitTransaction(); //all the operations are at success. make the changes final
    res.json(expense);
  } catch (error) {
    //transaction.abortTransaction();
    res.status(500).json(error);
  }
};

exports.deleteExpense = async (req, res) => {
  //let transaction = await sequelize.transaction();
  try {
    const user = req.user;
    const id = req.params.expenseId;
    const expense = await Expense.findOne({ _id: id });
    const amount = expense.amount;
    await expense.deleteOne();
    (user.totalexpense = parseInt(user.totalexpense) - parseInt(amount)),
      await user.save();
    //transaction.commit();
    res.status(200).json();
  } catch (error) {
    //transaction.rollback();
    console.log(error);
    res.status(500).json({ err: "server problem while deleting" }); //internal server error
  }
};

const uploadToS3 = async (data, fileName) => {
  try {
    //console.log("3.1 Entered into s3 function");
    const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
    const AWS_IAM_ACCESS_KEY = process.env.AWS_IAM_ACCESS_KEY;
    const AWS_IAM_SECRET_KEY = process.env.AWS_IAM_SECRET_KEY;

    //create an awsS3 object
    const s3bucket = new AWS.S3({
      accessKeyId: AWS_IAM_ACCESS_KEY,
      secretAccessKey: AWS_IAM_SECRET_KEY,
    });

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL: "public-read",
    };

    //we want to return the s3response, but its inside this callback so we cant just return it
    //one way is to use a variable e.g. let url; inside callback use url=s3response.location, as url variable will be in the closure
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, s3response) => {
        if (err) {
          reject(err);
        } else {
          resolve(s3response.Location);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.downloadExpenses = async (req, res) => {
  try {
    const expenses = Expense.find({ userId: user._id });

    const fileName = `Expense${req.user._id}/
    ${new Date()}.txt`;

    const stringifiedExpenses = JSON.stringify(expenses);
    const fileUrl = await uploadToS3(stringifiedExpenses, fileName);

    const newDownload = new DownloadExpense({
      name: fileName,
      link: fileUrl,
      userId: req.user._id,
    });
    newDownload.save();

    const allExpenses = await DownloadExpense.find({
      userId: req.user._id,
    }).select("name link");

    res.status(201).json({ fileUrl, allExpenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPaginatedExpenses = async (req, res) => {
  try {
    const user = req.user;
    const pageNo = Number(req.query.pageNo);

    const limit = req.query.limit != "null" ? Number(req.query.limit) : 5; // number of items per page

    const offset = (pageNo - 1) * limit; // calculate the offset based on the page number and limit

    //rows means expenses here.
    const count = await Expense.countDocuments({ userId: user._id });

    const rows = await Expense.find({ userId: user._id })
      .sort({ _id: -1 }) //_id have a timestamp encoded within it
      .skip(offset)
      .limit(limit);

    const currentPage = pageNo;
    const hasNextPage = limit * pageNo < count; //total till this page < total
    const nextPage = pageNo + 1;
    const hasPrevPage = pageNo > 1;
    const prevPage = pageNo - 1;
    const obj = {
      currentPage,
      hasNextPage,
      nextPage,
      hasPrevPage,
      prevPage,
      rows,
    };

    res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
