const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" });
    return token
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const shcema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return shcema.validate(data);
};

module.expots = { User, validate }
    //then we install bcrypt module in order to hash password and save this in db.