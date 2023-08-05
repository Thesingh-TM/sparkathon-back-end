import db from "../models/index.js";
const Task = db.task;

export const allTasks = async (req, res) => {

  const filterBy = req.query.filterBy
  console.log('ff', filterBy)

  //filtering
  let today = new Date();
  today.setHours(0, 0, 0, 0)
  let first = today.getDate() - today.getDay();
  let last = first + 6;
  let firstday = new Date(today.setDate(first)).toUTCString();
  let lastday = new Date(today.setDate(last)).toUTCString();
  let firstDayMonth = new Date(today.setDate(1));
  let lastDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  lastDayMonth.setHours(23, 59, 59, 0);
  today = new Date().setHours(0, 0, 0, 0);

  let filter = { user:req.userId }
  if (filterBy == 'daily') {
    filter = {
      dateOfPurchase: {
        $gte: today
      }
    }
  } else if (filterBy == 'weekly') {
    filter = {
      dateOfPurchase: {
        $gte: firstday,
        $lte: lastday
      }
    }

  } else if (filterBy == 'monthly') {
    filter = {
      dateOfPurchase: {
        $gte: firstDayMonth,
        $lte: lastDayMonth
      }
    }

  }
  const task = await Task.find({ userId: req.userId }).exec(filter);
  res.status(200).send(task);
};

export const specificTask = async(req, res) => {
  const id = req.params.id
  const data = await Task.findById(id)
  res.status(200).send(data);
};

export const editExpense = async(req, res) => {
  const id = req.params.id
  const update = req.body
  const data = await Task.findByIdAndUpdate(id,update, {
  new: true
})
  res.status(200).send(data);
};

export const addExpense = async(req, res) => {
  let data = req.body;
  data.user = req.userId
  const task = new Task(data)
  const resp = await task.save()
  res.status(200).send(resp);
};

export const updateExpense = (req, res) => {
  res.status(200).send("updated");
};
