const mongoose = require("mongoose");
const Property = require("../models/propertyModel");
const Landlord = require("../models/landlordModel");
const Tenant = require("../models/tenantModel");
const Data=require("../models/dataModel")
const fs = require("fs");
const { MongoUnexpectedServerResponseError } = require("mongodb");
const { Console } = require("console");
const propertyController = {
  
  addProperty: async function (req, res) {
    const {address,landlord} = req.body;
    const landlorddata=await Landlord.findById(landlord)
    const landlordname=landlorddata.name+" "+landlorddata.lastname   
    const newProperty = new Property();
    const newData=new Data();
    let type="properties"
    newProperty.address = address;
    newData.address = address;
    newProperty.landlord = landlord;   
    
    newProperty.landlordname = landlordname; 
    newData.landlordname = landlordname; 
    newData.type=type 
    const searchAddress = await Property.findOne({ address: address });
    if (!searchAddress){
      try {
        const savedProperty = await newProperty.save();   
        newData.propertyid=savedProperty._id
        newData.landlordid=savedProperty.landlord
        
        const savepropertyindata=await newData.save();
        res.json(savedProperty);
        let array=[]
        let array2=[]
        let arr=[]
        
        const propertydatainlandlordata=await Data.findOne({landlordid:newProperty.landlord})
        
        let propertyaddress=propertydatainlandlordata.propertyaddress
        let propertyidinlandlord=propertydatainlandlordata.propertyidinlandlord
        array2=propertyaddress.push(newProperty.address)
        arr=propertyidinlandlord.push(newProperty._id)
        
        const landlordtoBeUpdated = await Data.findOneAndUpdate({landlordid:newProperty.landlord},
          {propertyaddress},
          {new:true});
        const landlord=await Landlord.findById(newProperty.landlord)
        let property=landlord.property       
        array=property.push(newProperty._id)     
        const UpdateLandlordProperty = await Landlord.findByIdAndUpdate(
        newProperty.landlord,
        { property },
        { new: true }
      )
     
      ;
        
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
    const oldaddress=await Property.findById(propertyId)
    const landlord=oldaddress.landlord
    const data=await Data.findOne({landlordid:landlord})
    const propertyaddress=data.propertyaddress
    //console.log(propertyaddress)
    const lastaddress=oldaddress.address
    console.log(lastaddress)
     
    
        const {address} =req.body;
        function changeaddress(element){
          if (element==lastaddress){
            element=address
          }
          return element
        }
        let arr=propertyaddress.map(changeaddress)
        console.log(arr)  
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
        const UpdateDataaddress=await Data.updateOne({propertyid:propertyId}, { address },
          { new: true })
          const UpdateDatapropertyaddressinlandlors=await Data.updateOne({landlordid:landlord}, { propertyaddress:arr},
            { new: true })
        
        const UPdatedatatenantaddress=await Data.updateMany({propertyid:propertyId},{ address },
          { new: true })
        
      
       }else{
        res.json("property exists")
        }
    },
    deleteProperty: async function (req, res) {
      const { propertyId } = req.params;
      const finproperty=await Property.findById(propertyId)
      const address=finproperty.address
      const tenantToBeDelete = await Tenant.deleteMany({property:propertyId})
      const propertyToBeDelete = await Property.findByIdAndDelete(propertyId)
      const propertyToBeDeleteindata=await Data.deleteOne({address})
      res.status(200).json({
        prperyDeleted: {
          propertyToBeDelete,
        },
      });
    },

   
   
  };
  
  


module.exports = propertyController;