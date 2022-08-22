const mongoose = require("mongoose");
const Landlord = require("../models/landlordModel");
const { getToken } = require("../utils/tokens");
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const landlordController = {
  getLandlords: async function (req, res) {
    const landlords = await Landlord.find();

    res.json(landlords);
  },
  registerLandlord: async function (req, res) {
    const {name,lastname,email,phone} = req.body;
    const newLandlord = new Landlord();
    newLandlord.name = name;
    newLandlord.lastname = lastname;   
    newLandlord.email = email;
    newLandlord.phone = phone;
    //const searchEmail = await Landlord.findOne({ email: email });
    
    
      const savedLandlord = await newLandlord.save();
      res.json(savedLandlord);
    
    res.json();
    
  },
  
  
};

module.exports = landlordController;