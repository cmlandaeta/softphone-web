import mongoose from "mongoose";
import "dotenv/config";

const db = (async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("conectado a mongo DB");
  } catch (error) {
    console.log(error);
  }
})();

export default db;
