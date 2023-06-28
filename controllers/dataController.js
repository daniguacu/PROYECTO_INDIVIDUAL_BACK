const mongoose = require("mongoose");
const Data = require("../models/dataModel");
const Landlord= require("../models/landlordModel");
const Tenant= require("../models/tenantModel");
const Property=require("../models/propertyModel")

const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const dataController = {
  getData: async function (req, res) {
    const data = await Data.find();   
    res.json(data);
  },
  registerData: async function (req, res) {
    
    
    const {name,lastname,email,phone,address,tenantname,landlordname,initialbalance,tenantid,landlordid,property,propertyid,charge,landlordaddress}= req.body;
    const newData = new Data();
    newData.name = name;
    newData.lastname = lastname;   
    newData.email = email;
    newData.phone = phone;
    newData.address = address;
    newData.tenantname = tenantname;
    newData.landlordname = landlordname;
    newData.tenantid = tenantid;
    newData.landlordid = landlordid;
    newData.initialbalance = initialbalance;
    
    newData.propertyid = propertyid;
    newData.charge=charge;
    newData.landlordaddress=landlordaddress;
    
      try {
        const Data = await newData.save();
        res.json(Data);
      } catch (error) {
        console.log("Error");
      }
      
    
    
  },
  deleteTenantData: async function (req, res) {
   
    const { tenantid} = req.body;
    

    const tenantToBeDelete = await Data.deleteOne({tenantid:tenantid})
    let arr=[]
    const propertytenanttobedeleted=await Property.findOne({tenantid:tenantid})
    console.log(propertytenanttobedeleted)
    console.log(propertytenanttobedeleted._id)
    res.status(200).json({
      tenantDeleted: {
        tenantToBeDelete
      },
    });
  },
  updateTenantData: async function (req, res) {
    const {tenantid} = req.params;    
    
        const { name,lastname, phone, email} =req.body;
        const searchEmail = await Tenant.findOne({ email: email });        
        const updatedTenant = await Tenant.findByIdAndUpdate(
          tenantid,
          { name,lastname, phone, email},
          { new: true }
        );
        
    }
    
    
  
   
   
  };
  
  


module.exports = dataController;