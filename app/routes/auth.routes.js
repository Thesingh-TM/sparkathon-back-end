import { verifySignUp } from "../middlewares/index.js";
import {signup, signin , signout } from "../controllers/auth.controller.js";

export default function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    signup
  );

  app.post("/api/auth/signin", signin);

  app.post("/api/auth/signout", signout);
};
