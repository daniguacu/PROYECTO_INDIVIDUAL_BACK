const mongoose = require("mongoose");
const Ledger = require("../models/ledgerModel");
const Property=require("../models/propertyModel");
const Tenant=require("../models/tenantModel");
const { getToken } = require("../utils/tokens");
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const ledgerController = {
  getLedgers: async function(req,res){  
    const {tenant}=req.body  
    const tenantledger=await Ledger.findOne({tenant:tenant})
    res.json(tenantledger)
  },  
  registerinitialbalance: async function (req, res) {
    
    const {initialbalance,tenant} = req.body;
    const newLedger = new Ledger();
    newLedger.initialbalance = initialbalance;
    newLedger.tenant = tenant;   
        
    const searchTenant = await Ledger.findOne({ tenant: tenant })
    if (!searchTenant){
      try {
        const savedLedger= await newLedger.save();
        res.json(savedLedger);
      } catch (error) {
        console.log("Error");
      }
    res.json();
    } else{
        res.json("This tenant has already an initial balance")
      }
  },
  enterChargebytenandId: async function (req, res) {
    
    const {tenant,newcharge} = req.body;     
    const searchtenantledger=  await Ledger.findOne({tenant:tenant})
    let charge=searchtenantledger.charge
    
    
    
    charge.push(newcharge[0])
    
    
    const updateLedger=await Ledger.findOneAndUpdate({tenant:tenant},{charge},{ new: true })
    
    
    res.json(updateLedger)
    
    
    
  
     
        
    
  }    
  };
module.exports = ledgerController;