const mongoose = require("mongoose");
const User = require("../models/userModel");
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const userController = {
  getUsers: async function (req, res) {
    const users = await User.find();

    res.json(users);
  }};

module.exports = userController;