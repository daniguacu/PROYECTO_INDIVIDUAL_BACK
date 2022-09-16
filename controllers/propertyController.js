const mongoose = require("mongoose");
const Property = require("../models/propertyModel");
const Landlord = require("../models/landlordModel");
const Tenant = require("../models/tenantModel");

const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const propertyController = {
  
  addProperty: async function (req, res) {
    const {address,landlord,landlordname} = req.body;
    
    const newProperty = new Property();
    newProperty.address = address;
    newProperty.landlord = landlord;   
    newProperty.landlordname = landlordname; 
    
   
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
  getPropertiesbyId: async function(req,res){
    const{_id}=req.params
    const propertiesFounded=await Property.findById({_id})
    res.json(propertiesFounded)

  },
  getProperties: async function(req,res){
    
    const propertiesFounded=await Property.find()
    res.json(propertiesFounded)

  },
  updateProperty: async function (req, res) {
    const {propertyId} = req.params;
    
    
    
        const {address} =req.body;
        const searchAddress = await Property.findOne({ address: address });
        if (!searchAddress){
        const updatedProperty = await Property.findByIdAndUpdate(
          propertyId,
          { address},
          { new: true }
        );
        res.json(updatedProperty);
        const Updatetenantaddress = await Tenant.updateMany({property:propertyId}
          ,
          { address },
          { new: true });
        
      
       }else{
        res.json("property exists")
        }
    },
    deleteProperty: async function (req, res) {
      const { propertyId } = req.params;
      const tenantToBeDelete = await Tenant.deleteMany({property:propertyId})
      const propertyToBeDelete = await Property.findByIdAndDelete(propertyId)
      res.status(200).json({
        prperyDeleted: {
          propertyToBeDelete,
        },
      });
    },

   
   
  };
  
  


module.exports = propertyController;