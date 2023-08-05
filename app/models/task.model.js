import mongoose from "mongoose";
import User from "./user.model.js"
const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: String,
    description: String,
    categoryName:String,
    status: String,
    expenseType: String,
    dateOfPurchase: Number,
    reminderRequired:Boolean,
    budget:String,
    actualExpense:String,
    periodicity:String,
    userId:{type: mongoose.SchemaTypes.ObjectId, ref: User }
  })
);

export default Task;
