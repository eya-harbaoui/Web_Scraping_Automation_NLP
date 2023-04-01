const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt"); //to hash password

router.post("/", async(req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        //if not an error we gonna check if the user email exist or not
        const user = await User.findOne({ email: req.body.email });
        if (user)
        //if exist
            return res
            .status(409)
            .send({ message: "User with given email already Exist!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //salt= a random value that is added to the password before it is hashed, in order to make it harder for attackers to use precomputed tables (known as "rainbow tables") to crack the password.
        //SALT IN .env is indicating the desired strength of the salt 
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;