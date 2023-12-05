const mongoose = require("mongoose");
const { namespace } = require("./namespace");

const connect = async () => {
  const log = namespace.space("db");

  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    log.log("Db connected successfully");
    log.log("Host: ", connection.host, "Port: ", connection.port);
  } catch (err) {
    log.logErr("Error connecting to db");
    throw err;
  }
};

module.exports = connect;
