const { Authentication } = require("../middleware/Authentication");

const express = require("express");
const { UserController } = require("../controllers/user.controller");

const Userrouter = express.Router();

/* READ */
Userrouter.get("/:id", Authentication, UserController.getUser);
Userrouter.get("/:id/friends", Authentication, UserController.getUserFriends);

/* UPDATE */
Userrouter.patch("/:id/:friendId", Authentication, UserController.addRemoveFriend);

module.exports = {
  Userrouter,
};
