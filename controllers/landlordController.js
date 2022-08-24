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
    const searchEmail = await Landlord.findOne({ email: email });
    if (!searchEmail){
      try {
        const savedLandlord = await newLandlord.save();
        res.json(savedLandlord);
      } catch (error) {
        console.log("Error");
      }
    res.json();
    } else{
        res.json("user exists")
      }
  },
  updateLandlord: async function (req, res) {
    const {landlordId} = req.params;
    const landlord = await Landlord.findById(landlordId);
    if (landlord === null) {
      return res.status(404).json({
        error: "Landlord not found",
      })
    }else {
        const { name,lastname, phone, email} =req.body;
        const updatedLandlord = await Landlord.findByIdAndUpdate(
          landlordId,
          { name,lastname, phone, email},
          { new: true }
        );
        res.json(updatedLandlord);
      }
    },
    deleteLandlord: async function (req, res) {
      const { landlordId } = req.params;
  
      const landlordToBeDelete = await Landlord.findByIdAndDelete(landlordId )
      res.status(200).json({
        landlordDeleted: {
          landlordToBeDelete,
        },
      });
    },
    getLandlordbyid: async function (req, res) {
      const { landlordId } = req.params;
      const landlord = await Landlord.findById(landlordId);
      res.json(landlord);
    }
   
   
  };
  
  


module.exports = landlordController;