const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String
  //books : [{ type: Schema.Types.ObjectId, ref: "Books" }]
  
});

module.exports = mongoose.model("User", UserSchema);