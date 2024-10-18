import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connect() {
  try {
    // Database Connection
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("DB Connected!!");
  } catch (err) {
    console.error("Error connecting to the database:", err.message || err);
  }
}

// module.exports = connect;
