const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LedgerSchema = new Schema({
  initialbalance: {balance:Number,date:String},   
  tenant : { type: Schema.Types.ObjectId, ref: "Tenant" },
  charge:[{amount:Number,chargedate:String,postingdate:String,description:String,ref:Number,categ:String}]
  
  
});

module.exports = mongoose.model("Ledger", LedgerSchema);