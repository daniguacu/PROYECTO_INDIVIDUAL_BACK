const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  user_Id: String,
  address: String,
  landlordname:String,
  landlord : {type: Schema.Types.ObjectId, ref: "Landlord"},
  tenant :[{ type: Schema.Types.ObjectId, ref: "Tenant" }]
  
});

module.exports = mongoose.model("Property", PropertySchema);