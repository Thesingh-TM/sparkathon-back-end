import mongoose from 'mongoose';
import user from "./user.model.js"
import task from "./task.model.js"
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = user
db.task = task

export default db;