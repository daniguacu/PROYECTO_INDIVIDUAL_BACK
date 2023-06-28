const mongoose = require("mongoose");
const Landlord = require("../models/landlordModel");
const Property=require("../models/propertyModel");
const Tenant=require("../models/tenantModel");
const Data=require("../models/dataModel")
const { getToken } = require("../utils/tokens");
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const landlordController = {
  getLandlords: async function (req, res) {
    const landlords = await Landlord.find();
    res.json(landlords);
  },
  
  registerLandlord: async function (req, res) {
    let {name,lastname,address,email,phone} = req.body;
    const namespliced=name.split(" ")
    const lastnamespliced=lastname.split(" ")


    function ajustarnombreyappellido (arrayinfunction){
    const tolowercase=(element)=>{
            return element.toLowerCase("")
    }
    let array=arrayinfunction.map(tolowercase)
    const touppercase=(element)=>{
          let firstletter=element.charAt(0).toUpperCase("")
          let length=element.length
          if (element.length>0){
            const word=firstletter+element.substr(1,length)
            return word
          }else{
            return firstletter
          }          
    }
    let array2=array.map(touppercase)
    let array3=array2.reduce(function(acumulador,elemento){
            return acumulador+" "+elemento
    })
    return array3}
    console.log(name)
    name=ajustarnombreyappellido(namespliced)
    lastname=ajustarnombreyappellido(lastnamespliced);
    console.log(name,email)
    const newLandlord = new Landlord();
    const newData=new Data();
    newLandlord.name = name;
    newData.name = name;
    newLandlord.lastname = lastname;   
    newData.lastname = lastname;  
    newLandlord.address=address;
    newData.landlordaddress=address; 
    newLandlord.email = email;
    newData.email = email;
    newLandlord.phone = phone;
    newData.phone = phone;
    
    const searchEmail = await Landlord.findOne({ email: email });
    if (!searchEmail){
      try {
        const savedLandlord = await newLandlord.save()
        newData.landlordid=savedLandlord._id  ;
        const savedlandlordinData=await newData.save();
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
    let findlandlordname=await Landlord.findById(landlordId)
    findlandlordname=findlandlordname.name;
    let findlandlordlastname=await Landlord.findById(landlordId)
    findlandlordlastname=findlandlordlastname.lastname
    const findlandlordnfullname=findlandlordname+" "+findlandlordlastname
    console.log(findlandlordnfullname)
    if (landlord === null) {
      return res.status(404).json({
        error: "Landlord not found",
      })
    }else {
      let namespliced=[" "]
      let lastnamespliced=[" "]
        let { name,lastname,address,phone, email} =req.body;
        if(name){
        namespliced=name.split(" ")}
        if(lastname){
        lastnamespliced=lastname.split(" ")}


    function ajustarnombreyappellido (arrayinfunction){
    const tolowercase=(element)=>{
            return element.toLowerCase("")
    }
    let array=arrayinfunction.map(tolowercase)
    const touppercase=(element)=>{
          let firstletter=element.charAt(0).toUpperCase("")
          let length=element.length
          if (element.length>0){
            const word=firstletter+element.substr(1,length)
            return word
          }else{
            return firstletter
          }          
        }
      let array2=array.map(touppercase)
      let array3=array2.reduce(function(acumulador,elemento){
              return acumulador+" "+elemento
      })
      return array3}
      console.log(name)
      name=ajustarnombreyappellido(namespliced)
      lastname=ajustarnombreyappellido(lastnamespliced);

        const updatedLandlord = await Landlord.findByIdAndUpdate(
          landlordId,
          { name,lastname, address,phone, email},
          { new: true }
        );
        const updatelandlordindata=await Data.findOneAndUpdate({landlordid:landlordId}, { name,lastname,address,phone, email},
          { new: true })
        res.json(updatedLandlord);

        
        
        let landlordname1=updatedLandlord.name
        let landlordlastname=updatedLandlord.lastname
        let landlordname=landlordname1+" "+landlordlastname
      
        const updatelandlordnameindata=await Data.updateMany({landlordid:landlordId},{landlordname:landlordname,landlordaddress:address},{new:true})
        const UpdateLandlordProperty = await Property.updateMany({landlord:landlord._id}
        ,
        { landlordname },
        { new: true });
        const UpdateLandlordTenant = await Tenant.updateMany({landlord:landlord._id}
          ,
          { landlordname },
          { new: true });
       
      }
    },
    deleteLandlord: async function (req, res) {
      const { landlordId } = req.params;
      const landlordname1=await Landlord.findById(landlordId).name
      const landlordname2=await Landlord.findById(landlordId).lastname
      const landlordname=landlordname1+" "+landlordname2
      const propertyToBeDelete = await Property.deleteMany({landlord:landlordId})
      const tenantToBeDelete = await Tenant.deleteMany({landlord:landlordId})
      const datatobedelete=await Data.deleteMany({landlordid:landlordId})
      const datatobedeleteinproperty=await Data.deleteMany({landlordname})
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