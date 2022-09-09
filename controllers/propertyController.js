const mongoose = require("mongoose");
const Property = require("../models/propertyModel");
const Landlord = require("../models/landlordModel");

const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const propertyController = {
  
  addProperty: async function (req, res) {
    const {address,landlord} = req.body;
    
    const newProperty = new Property();
    newProperty.address = address;
    newProperty.landlord = landlord;   
    
   
    const searchAddress = await Property.findOne({ address: address });
    if (!searchAddress){
      try {
        const savedProperty = await newProperty.save();
        
        
        res.json(savedProperty);
        let array=[]
        const landlordtoBeUpdated = await Landlord.findById(newProperty.landlord);
        let property=landlordtoBeUpdated.property
      
        array=property.push(newProperty._id)
      
      
        const UpdateLandlordProperty = await Landlord.findByIdAndUpdate(
        newProperty.landlord,
        { property },
        { new: true }
      );
        
      } catch (error) {
        console.log("Error");
      }
    res.json();
    } else{
        res.json("property exists")
    }
    
  },
  getPropertiesbyLandlordId: async function(req,res){
    const{landlord}=req.params
    const propertiesFounded=await Property.find({landlord})
    res.json(propertiesFounded)

  }
   
   
  };
  
  


module.exports = propertyController;