const mongoose = require("mongoose");
const Tenant = require("../models/tenantModel");
const Landlord= require("../models/landlordModel");
const Property= require("../models/propertyModel");
const Data=require("../models/dataModel")

const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const tenantController = {
  getTenants: async function (req, res) {
    const tenants = await Tenant.find();   
    res.json(tenants);
  },
  registerTenant: async function (req, res) {  
    
    let {name,lastname,email,phone,property} = req.body;
    const namespliced=name.split(" ")
    const lastnamespliced=lastname.split(" ")
    const findlandlordbyproperty=await Property.findById(property)
    let landlordname=findlandlordbyproperty.landlordname
    let address=findlandlordbyproperty.address
    let landlord=findlandlordbyproperty.landlord
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
    const newTenant = new Tenant();
    const newData=new Data();
    newTenant.name = name;
    newData.name=name
    newTenant.lastname = lastname;
    newData.lastname = lastname;   
    newTenant.email = email;
    newData.email = email;
    newTenant.phone = phone;
    newData.phone = phone;
    newTenant.address = address;
    newData.address = address;
    newTenant.landlordname = landlordname;
    newData.landlordname = landlordname;
    newTenant.property=property;
    newData.propertyid = property;
    newTenant.landlord=landlord;


    const searchEmail = await Tenant.findOne({ email: email });
    if (!searchEmail){ 
      
    
      try {
        const savedTenant = await newTenant.save();
        newData.tenantid=savedTenant._id    
        newData.landlordid=savedTenant.landlord    
        const savedtenantinData=await newData.save();      
        const propertyid= JSON.stringify(property)
        let arr=[]
        const propertyarray=await Property.findById(newTenant.property);
        let tenant=propertyarray.tenant
        arr=tenant.push(savedTenant._id)       
        console.log(arr)       
        res.json(savedTenant);
        const UpdatePropertyTenant = await Property.findByIdAndUpdate(
          propertyarray,
          {tenant},
          { new: true }
        )

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
    //const tenantToBeDeleteindata = await Data.findOneAndUpdate({tenantid:tenantId})
    //const tenantToBeDeleteinproperty=await Property.findOne({tenantid:tenantId})
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
        const updatetenantindata=await Data.findOneAndUpdate({tenantid:tenantId},
          { name,lastname, phone, email},
          { new: true }
        );
        res.json(updatedTenant);}else{
          res.json("tenant exists")
        }
      }    
   
  };
  
  


module.exports = tenantController;