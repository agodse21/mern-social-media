const express = require("express");
const { AuthController } = require("../controllers/Auth.controller");
const { upload } = require("../middleware/FileUploader");


const AuthRouter = express.Router();
AuthRouter.post("/login", AuthController.Login);
AuthRouter.post("/signup", upload.single("picture"), AuthController.SignUp);

module.exports = {
  AuthRouter,
};
