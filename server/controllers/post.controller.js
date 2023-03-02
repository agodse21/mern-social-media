const express = require("express");
const { AuthModel } = require("../models/auth.model");
const { PostModel } = require("../models/post.model");

const getFeedPosts = async (req, res) => {
  try {
    const post = await PostModel.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await PostModel.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const post = await PostModel.findOneAndDelete({ _id: id, userId: user_id });
    if (post) {
      res.status(200).json({ msg: "Post deleted Successfuly!" });
    }
  } catch (err) {
    res.status(400).json({ error: "Something went wrong! please try again!" });
  }
};
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await PostModel.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
const CreatePost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await AuthModel.findById(userId);
    const newPost = new PostModel({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await PostModel.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
const PostController = {
  getFeedPosts,
  getUserPosts,
  likePost,
  CreatePost,
  deletePost,
};
module.exports = {
  PostController,
};
