const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  name: String,
  lastname: String,
  email: String,  
  phone:String,
  address:String,
  tenantname:String,
  landlordname:String,
  initialbalance: {balance:Number,date:String},
  tenantid : { type: Schema.Types.ObjectId, ref: "Tenant" },
  landlordid: { type: Schema.Types.ObjectId, ref: "Landlord" },
  propertyaddress :[],
  propertyidinlandlord:[],
  propertyid : [{ type: Schema.Types.ObjectId, ref: "Property" }]  , 
  charge:[{amount:Number,chargedate:String,postingdate:String,description:String,ref:Number,categ:String}],
  landlordaddress:String,
  type:String
});

module.exports = mongoose.model("Data", DataSchema);