const express = require("express");
const { UserController } = require("../controllers/user.controller");
const { upload } = require("../middleware/FileUploader");
// const { Authentication } = require("../middlewares/Authentication");

const UserRouter = express.Router();
UserRouter.post("/login", UserController.Login);
UserRouter.post("/signup", upload.single("picture"), UserController.SignUp);

module.exports = {
  UserRouter,
};
