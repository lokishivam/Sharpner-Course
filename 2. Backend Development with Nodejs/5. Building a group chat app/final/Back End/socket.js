let io;

module.exports = {
  init: (httpServer, corsObj) => {
    io = require("socket.io")(httpServer, corsObj);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
