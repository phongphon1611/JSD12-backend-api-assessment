import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  try {
    await mongoose.connect(uri, { dbName: "API -Assessment-Products" });
    console.log("MongoDB is Conected👍👍👍");
  } catch (err) {
    console.error(`❌❌❌connected Fail ❌❌❌:${err}`);
    throw err;
  }
};
