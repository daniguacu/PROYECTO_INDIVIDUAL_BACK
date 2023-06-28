const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  property:[{ type: Schema.Types.ObjectId, ref: "Property" }],
  landlord:[{ type: Schema.Types.ObjectId, ref: "Landlord" }],
  tenant:[{ type: Schema.Types.ObjectId, ref: "Tenant" }]
  
  
});

module.exports = mongoose.model("User", UserSchema);