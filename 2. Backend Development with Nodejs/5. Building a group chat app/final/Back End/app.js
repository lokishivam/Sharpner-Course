const express = require('express');
const app = express();
//In an Express application, the app object is an instance of the Express module that 
//provides a set of methods to define routes, configure middleware, 
//and handle HTTP requests and responses. The app object is the central part of an Express application,
// and it's used to define the behavior of the server.
const cors = require('cors');

const bodyParser = require('body-parser');

//if a front end from a different origin e.g. 5500 is trying to access/make request to server running on 
//different origin e.g. 3000, i have to give him the access because browsers implement cors policy.
 app.use(cors({origin: 'http://127.0.0.1:5500'}));

const sequelize = require('./util/database');

//**** Vimp
//You need to import models on the app.js file so that they get synced and table is created,
//If the model is indirectly getting imported, that is fine aswell. But good practice is to import it.
const User = require('./models/user');

//import router to use it as middleware function.
//order matters, first sequelize then userRouter, as User is indirectly imported via userRouter 
const userRouter = require('./routers/user');
//----------------------------imports--------------

app.use(bodyParser.json());


app.use('/users', userRouter);

sequelize.sync() 
  .then((result) => {
    //console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
