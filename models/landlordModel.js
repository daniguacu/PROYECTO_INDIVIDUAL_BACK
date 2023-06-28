const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandlordSchema = new Schema({
  user_Id: String,
  name: String,
  lastname: String,
  address:String,
  email: String,  
  phone:String,
  property : [{ type: Schema.Types.ObjectId, ref: "Property" }]  
  
});

module.exports = mongoose.model("Landlord", LandlordSchema);