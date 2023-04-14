const express = require("express");
const app = express(); //express init
const mongoose = require('mongoose');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

//importing web token 
const jwt = require("jsonwebtoken");
//givin random numbers so it can decrypt using it 
const JWT_SECRET = "wwkjdhf54845(dr)sdf78251920ahj?![]88";
const mongourl =
    "mongodb+srv://mohamedaziztakali:*azizpcd2023*@cluster0.epr4nh4.mongodb.net/test";
mongoose.connect(mongourl, {
        useNewUrlParser: true
    }).then(() => { console.log("connected to db"); })
    .catch(e => console.log(e))
require("./userDetails");
const User = mongoose.model("Userinfo");
//to register any user
app.post("/register", async(req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            res.json({ error: "User already exists" }); //to avoid crashing while error khater mail unique
        } else {
            await User.create({
                firstName,
                lastName,
                email,
                password: encryptedPassword,
            });
            res.send({ status: "ok" });
        }
    } catch (error) {
        console.log(error);
        res.send({ status: "error ééé" });
    }
});


app.post("/login-user", async(req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User Not found" });
    }
    //if user exists
    //password is encrypted so I need to decrypt it using jwt token
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: 10, //10 seconds
        });
        //successfull login

        if (res.status(201)) {
            return res.json({ status: "ok", data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    //if all fail 
    res.json({ status: "error", error: "Invalid Password" });
});
app.post("/userData", async(req, res) => {
    const { token } = req.body;
    try {
        //verify if token true or not 
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err) {
                return "token expired";
            }
            return res;
        }); //if verified => all user details are stored in user 
        console.log(user);
        if (user == "token expired") {
            return res.send({ status: "error", data: "token expired" });
        }

        const useremail = user.email;
        User.findOne({ email: useremail }).then((data) => {
            res.send({ status: "ok", data: data });
        }).catch((error) => {
            res.send({ status: "error", data: error });
        });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", data: error });
    }
})

app.listen(5000, () => {
    console.log("server started");
})