const Expense = require("../models/expense");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");
require("dotenv").config();

exports.postAddExpense = async (req, res) => {
  let transaction = await sequelize.transaction(); //returns a promise that resolves into transaction object
  try {
    const user = req.user;
    const { amount, description, category } = req.body;

    const expense = await user.createExpense(
      {
        amount: amount === "" ? null : amount,
        description: description === "" ? null : description,
        category: category === "" ? null : category,
      },
      { transaction }
    );

    await user.update(
      {
        totalexpense: user.totalexpense
          ? parseInt(user.totalexpense) + parseInt(amount)
          : amount,
      },
      { transaction }
    );
    transaction.commit(); //all the operations are at success. make the changes final
    res.json(expense);
  } catch (error) {
    transaction.rollback();
    res.status(500).json(error);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const user = req.user;
    const expenses = await user.getExpenses();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteExpense = async (req, res) => {
  let transaction = await sequelize.transaction();
  try {
    const user = req.user;
    const id = req.params.expenseId;
    const expense = await Expense.findByPk(id);
    const amount = expense.amount;
    await expense.destroy({ transaction });
    await user.update(
      {
        totalexpense: parseInt(user.totalexpense) - parseInt(amount),
      },
      { transaction }
    );
    transaction.commit();
    res.status(200).json();
  } catch (error) {
    transaction.rollback();

    res.status(500).json({ err: "server problem while deleting" }); //internal server error
  }
};

//
const uploadToS3 = async (data, fileName) => {
  try {
    console.log("3.1 Entered into s3 function");
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

    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, s3response) => {
        if (err) {
          reject(err);
        } else {
          console.log("3.2 s3 response", s3response.Location);
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
    console.log("1. enter downloads function");

    const expenses = await req.user.getExpenses();
    console.log("2. ", expenses);

    const fileName = `Expense${req.user.id}/
    ${new Date()}.txt`;
    console.log("2.1 fileName : ", fileName);

    const stringifiedExpenses = JSON.stringify(expenses);
    console.log("3. stringified ", stringifiedExpenses);

    const fileUrl = await uploadToS3(stringifiedExpenses, fileName);
    console.log("4. fileUrl ", fileUrl);

    // const instanceMethods = Object.getOwnPropertyNames(
    //   Object.getPrototypeOf(req.user)
    // );
    // console.log(instanceMethods);

    await req.user.createDownloadExpense({ link: fileUrl, name: fileName });

    console.log("5. adding data to the downloads table");

    const allExpenses = await req.user.getDownloadExpenses({
      attributes: ["link", "name"],
    });

    console.log("6. all expenses", allExpenses);
    res.status(201).json({ fileUrl, allExpenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getPaginatedExpenses = async (req, res) => {
  try {
    console.log("entered into pagination");
    const user = req.user;
    const pageNo = Number(req.query.pageNo);
    console.log("0. page no = ", pageNo);
    const limit = req.query.limit != "null" ? Number(req.query.limit) : 5; // number of items per page
    console.log(limit);
    const offset = (pageNo - 1) * limit; // calculate the offset based on the page number and limit

    // Find the expenses belonging to the user
    const { count, rows } = await Expense.findAndCountAll({
      where: {
        userId: user.id,
      },
      offset: offset,
      limit: limit,
      order: [["createdAt", "DESC"]], // order rows by createdAt field in descending order
    });
    console.log("1. rows:", rows);

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
    console.log("2. obj = ", obj);
    res.status(200).json(obj);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
