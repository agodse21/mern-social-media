const express = require("express");
const { PostController } = require("../controllers/post.controller");
const { Authentication } = require("../middleware/Authentication");
const { upload } = require("../middleware/FileUploader");

const Postrouter = express.Router();

/* READ */
Postrouter.get("/", Authentication, PostController.getFeedPosts);
Postrouter.get("/:userId/posts", Authentication, PostController.getUserPosts);

/* UPDATE */
Postrouter.patch("/:id/like", Authentication, PostController.likePost);
Postrouter.delete("/deletepost/:id",Authentication,PostController.deletePost)
Postrouter.post(
  "/createpost",
  Authentication,
  upload.single("picture"),
  PostController.CreatePost
);

module.exports = {
  Postrouter,
};
