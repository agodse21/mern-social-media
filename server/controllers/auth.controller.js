const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AuthModel } = require("../models/auth.model");

const SignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = req.body;

  const isUser = await AuthModel.findOne({ email });
  if (isUser) {
    res.status(500).json({ error: "user Already exist" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res
          .status(500)
          .json({ error: "Something went wrong try after sometime" });
      }
      const newUser = new AuthModel({
        firstName,
        lastName,
        email,
        password: hash,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });

      try {
        const savedUser = await newUser.save();
        // res.status(201).json(savedUser);
        // await new_user.save();

        res.status(201).json({ msg: "Signup Sucessfully" });
      } catch (err) {
        res
          .status(500)
          .json({ error: "someting went wrong,please try again !" });
      }
    });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthModel.findOne({ email });

  if (user) {
    const hashed_pass = user.password;
    const user_id = user._id;
    bcrypt.compare(password, hashed_pass, function (err, result) {
      if (err) {
        res
          .status(400)
          .json({ error: "Something went wrong try after sometime" });
      }
      if (result) {
        const token = jwt.sign(
          { user_id: user_id, email: email },
          process.env.SECRET_KEY
        );
        delete user.password;
        res.status(200).json({ msg: "Login Succesfull!", token, user });
      } else {
        res.status(400).json({ error: "Check details once and try again!" });
      }
    });
  } else {
    res.status(400).json({ error: "User does not exist. " });
  }
};

const AuthController = {
  Login,
  SignUp,
};
module.exports = {
  AuthController,
};
