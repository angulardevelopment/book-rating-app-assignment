import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

const app=express()

dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_TOKEN);
      console.log("Connected to Database");
    } catch (e) {
      throw e;
    }
  };
  
  mongoose.connection.on("connected", () => {
    console.log("mongodb connected");
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
  });

app.listen(5000, () => {
    connect();
    console.log("server listening on port number 5000");
  });
  