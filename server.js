import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import dbConfig from "./app/config/db.config.js";
import db from "./app/models/index.js";
import AuthRoutes from "./app/routes/auth.routes.js"
import TaskRoutes from "./app/routes/task.routes.js"
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);


db.mongoose
  .connect(`${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

// routes
AuthRoutes(app);
TaskRoutes(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


