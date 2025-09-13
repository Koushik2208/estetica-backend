const mongoose = require("mongoose");
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const conn = await mongoose.connect(process.env.MONGO_URI);
  isConnected = conn.connections[0].readyState;
  console.log("MongoDB Connected:", conn.connection.host);
}

module.exports = connectDB;
