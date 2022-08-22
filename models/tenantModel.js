const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  property:{ type: Schema.Types.ObjectId, ref: "Property" },
  landlord:{ type: Schema.Types.ObjectId, ref: "Landlord" }
  
  
});

module.exports = mongoose.model("Tenant", TenantSchema);