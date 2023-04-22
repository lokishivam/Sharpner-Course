const express = require("express");
const app = express();
//In an Express application, the app object is an instance of the Express module that
//provides a set of methods to define routes, configure middleware,
//and handle HTTP requests and responses. The app object is the central part of an Express application,
// and it's used to define the behavior of the server.
const cors = require("cors");

const bodyParser = require("body-parser");

//if a front end from a different origin e.g. 5500 is trying to access/make request to server running on
//different origin e.g. 3000, i have to give him the access because browsers implement cors policy.
app.use(cors());

const sequelize = require("./util/database");

//**** Vimp
//You need to import models on the app.js file so that they get synced and table is created,
//If the model is indirectly getting imported, that is fine aswell. But good practice is to import it.
const User = require("./models/user");
const Message = require("./models/message");
const Group = require("./models/group");
const GroupMembership = require("./models/groupMembership");

//import router to use it as middleware function.
//order matters, first sequelize then userRouter, as User is indirectly imported via userRouter
const userRouter = require("./routers/user");
const messageRouter = require("./routers/message");
const groupRouter = require("./routers/group");
const adminRouter = require("./routers/admin");

//controllers
const messageConstroller = require("./controllers/message");
//----------------------------imports--------------

app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/messages", messageRouter);
app.use("/groups", groupRouter);
app.use("/admin", adminRouter);

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group, { through: GroupMembership });
Group.belongsToMany(User, { through: GroupMembership });

//sequelize.sync({force:true})
sequelize
  .sync()
  .then((result) => {
    //console.log(result);
    const server = app.listen(3000);
    const io = require("./socket").init(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);

      // Handle socket events here
      socket.on("joinRoom", (groupId, callback) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined room ${groupId}`);
        callback(`You joined room ${groupId}`);
      });

      socket.on("sendMessage", (groupId, userId, message, callback) => {
        messageConstroller.addMessage(groupId, userId, message, callback);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

//---------------------------------------------
