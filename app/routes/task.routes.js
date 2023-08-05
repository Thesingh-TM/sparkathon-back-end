import { authJwt } from "../middlewares/index.js";
import { allTasks, specificTask, addExpense , editExpense} from "../controllers/task.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  app.get("/api/tasks", [authJwt.verifyToken], allTasks);

  app.get(
    "/api/specific-task/:id",
    [authJwt.verifyToken],
    specificTask
  );
  app.put("/api/specific-task/:id",[authJwt.verifyToken],editExpense)

  app.post(
    "/api/task/addExpense",
    [authJwt.verifyToken], addExpense
  );
};
