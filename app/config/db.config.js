import dotenv from "dotenv"
dotenv.config()
const dbConfig = {
  DB: process.env.MONGO_URL
};
console.log(process.env)
export default dbConfig