const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

exports.mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://lokishivam:d9bBDVURk9wzQFTG@cluster0.atzztfh.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("connected");
      _db = client.db();
      //once a connection is established, the client object is used to access databases and
      //collections within the instance.
      //The client.db() method is used to access a database from the connected MongoDB instance.
      callback();
    })
    .catch((err) => console.log(err));
};

exports.getDb = () => {
  if (_db) {
    return _db;
    //the client object is used to access databases and collections within the instance.
  }
  throw new Error("no connection found");
};
