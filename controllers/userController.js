const mongoose = require("mongoose");
const User = require("../models/userModel");
const { getToken } = require("../utils/tokens");
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const userController = {
  getUsers: async function (req, res) {
    const users = await User.find();

    res.json(users);
  },
  registerUser: async function (req, res) {
    const { name, lastname, email, password } = req.body;
    const newUser = new User();
    newUser.name = name;
    newUser.lastname = lastname;   
    newUser.email = email;
    newUser.password = password;
    const searchEmail = await User.findOne({ email: email });
    if (!searchEmail){
    try {
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.log("Error");
    }
    res.json();
    }else{
      res.json("user exists")
    }
  },
  loginUser: async function (req, res) {
    const { email, password } = req.body;

    const searchEmail = await User.findOne({ email: email });
    

    if (!searchEmail) {
      return res.status(404).json({
        error: "user_not_found",
      });
    }
    if (password === searchEmail.password) {
      return res.json({
        token: getToken(searchEmail._id),
        id: searchEmail._id,             
        name: searchEmail.name,
        lastname: searchEmail.lastname,
        email: searchEmail.email,
      });
    }
    res.json("wrong_password");
  },
  getUserId: async function (req, res) {
    const { userId } = req.params;
    try {
      const searchUser = await User.findById(userId);
      console.log(searchUser);
      res.json(searchUser);
    } catch (error) {
      return res.status(404).json({
        error: "User not found",
      });
    }
  },
};

module.exports = userController;