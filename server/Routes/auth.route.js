const express = require("express");
const { AuthController } = require("../controllers/Auth.controller");
const { Authentication } = require("../middleware/Authentication");
const { upload } = require("../middleware/FileUploader");


const AuthRouter = express.Router();
AuthRouter.post("/login",  Authentication ,AuthController.Login);
AuthRouter.post("/signup", upload.single("picture"), AuthController.SignUp);

module.exports = {
  AuthRouter,
};
