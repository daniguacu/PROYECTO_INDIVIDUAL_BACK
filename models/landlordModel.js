const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LandlordSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  
  phone:String,
  property : [{ type: Schema.Types.ObjectId, ref: "Property" }]
  
  
});

module.exports = mongoose.model("Landlord", LandlordSchema);