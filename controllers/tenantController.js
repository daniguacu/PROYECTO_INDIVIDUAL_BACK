const mongoose = require("mongoose");
const Tenant = require("../models/tenantModel");

const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const tenantController = {
  getTenants: async function (req, res) {
    const tenants = await Tenant.find();
    res.json(tenants);
  },
  registerTenant: async function (req, res) {
    
    
    const {name,lastname,email,phone,address,landlordname,property,landlord} = req.body;
    const newTenant = new Tenant();
    newTenant.name = name;
    newTenant.lastname = lastname;   
    newTenant.email = email;
    newTenant.phone = phone;
    newTenant.address = address;
    newTenant.landlordname = landlordname;
    newTenant.property=property;
    newTenant.landlord=landlord;

    const searchEmail = await Tenant.findOne({ email: email });
    if (!searchEmail){
    
    
    
      try {
        const savedTenant = await newTenant.save();
        res.json(savedTenant);
      } catch (error) {
        console.log("Error");
      }
      
    
    } else{
      res.json("tenant exists");
      }
  },
  deleteTenant: async function (req, res) {
    const { tenantId } = req.params;

    const tenantToBeDelete = await Tenant.findByIdAndDelete(tenantId)
    res.status(200).json({
      tenantDeleted: {
        tenantToBeDelete,
      },
    });
  },
  updateTenant: async function (req, res) {
    const {tenantId} = req.params;
    
    
    
        const { name,lastname, phone, email} =req.body;
        const searchEmail = await Tenant.findOne({ email: email });
        if (!searchEmail){
        const updatedTenant = await Tenant.findByIdAndUpdate(
          tenantId,
          { name,lastname, phone, email},
          { new: true }
        );
        res.json(updatedTenant);}else{
          res.json("tenant exists")
        }
        
    }
    
    
  
   
   
  };
  
  


module.exports = tenantController;