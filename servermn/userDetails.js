const mongoose = require("mongoose");
const userDetailsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
}, {
    //we have to store this schema in a collection
    collection: "Userinfo",
});

//create model
//mongoose.model( "Userinfo", userDetailsSchema );
mongoose.model("Userinfo", userDetailsSchema);