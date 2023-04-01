const mongoose = require("mongoose")
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB)
        console.log("connected to db successfully");
    } catch (error) {
        console.log("cnx error to db");
    }
};