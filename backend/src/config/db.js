import mongoose from "mongoose";

console.log("Connecting to MongoDB...");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://test-user-1:46RfsPHfdnOa7iAi@test-cluster-1.ozrmnzw.mongodb.net/"
    );
    console.log(`MongoDB Connected:`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const conn = await connectDB()
const db = conn.connection.useDb("todoapp");

export default db;