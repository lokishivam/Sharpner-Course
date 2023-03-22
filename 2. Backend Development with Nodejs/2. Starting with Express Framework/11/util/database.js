const mysql = require("mysql2");

//We need to create a seperate connection with database for every query.
//So we use createpool which returns an object that manages the multiple connections simultaneously.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "johncena48",
});

module.exports = pool.promise();
//Finally, the pool.promise() method is called to create a promise-based version of the pool,
//which allows for asynchronous queries to be executed on the database using promises instead of callbacks.
//when you make a call using the object returned by pool.promise, eg db.execute(...) this call will return a promise
//Which we will handle with .then, if the promise is resolved, whenever its resolved, you can use the res of then(res => ...)
