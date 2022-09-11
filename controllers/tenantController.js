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
    

    const {name,lastname,email,phone,property,landlord} = req.body;
    const newTenant = new Tenant();
    newTenant.name = name;
    newTenant.lastname = lastname;   
    newTenant.email = email;
    newTenant.phone = phone;
    newTenant.property=property;
    newTenant.landlord=landlord;

   
    
    
    
      try {
        const savedTenant = await newTenant.save();
        res.json(savedTenant);
      } catch (error) {
        console.log("Error");
      }
      
    
  }
  
   
   
  };
  
  


module.exports = tenantController;