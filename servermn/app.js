const express = require("express");
const app = express(); //express init
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
//creating UI with enginejs (ejs) in node will use ejs template to show javascript code in node
//ejs=html javascript template for node
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); //obligatoire f pswd reset sinn ymchih
//importing web token
const jwt = require("jsonwebtoken");
//to send link in the mail 
var nodemailer = require('nodemailer');

//givin random numbers so it can decrypt using it
const JWT_SECRET = "wwkjdhf54845(dr)sdf78251920ahj?![]88";
const mongourl =
    "mongodb+srv://mohamedaziztakali:*azizpcd2023*@cluster0.epr4nh4.mongodb.net/test";
mongoose
    .connect(mongourl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch((e) => console.log(e));
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
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {
        console.log(error);
        res.send({ status: "error", data: error });
    }
});

app.listen(5000, () => {
    console.log("server started");
});
app.post("/forgot-password", async(req, res) => {
    const { email } = req.body;
    try {
        const oldUser = await User.findOne({ email });
        if (!oldUser) {
            return res.json({ status: "User Does not exists ! " });
        }
        //implement secret ued to generate token sended to user if the user exists
        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
            expiresIn: "5m",
        }); //zedna expiration of email 5min
        //this is the link to be sent to user's mail through which he can reset pswd
        const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`; //link to be sent to user's mail
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "takaliaziz4@gmail.com",
                pass: "swscaqmlexsaooao",
            },
        });

        var mailOptions = {
            from: "youremail@gmail.com",
            to: oldUser.email,
            subject: "Password Reset",
            text: link,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log(link);
    } catch (error) {
        console.error(error);
        res.json({ status: "Error occurred" });
    }
});
//when user clicks on the link he will be redirected to this api:
app.get('/reset-password/:id/:token', async(req, res) => {
    //we are sending user id and token so here we're gonna extract them
    const { id, token } = req.params;
    console.log(req.params);
    // console.log("Reset password route accessed");
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Does not exists ! " });
    }
    const secret = JWT_SECRET + oldUser.password;
    try { //verifying secret
        const verify = jwt.verify(token, secret);
        // res.send( "Verified !" );
        //tawa f blast verified bch naffichilou win ybdl el mdp
        res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
        console.log(error);
        res.send("Not verified !");

    }
});
//hedhi for reset pswd api ama bel post
//ba3d matjih html api w yreseti pswd 
app.post("/reset-password/:id/:token", async(req, res) => {
    //we are sending user id and token so here we're gonna extract them
    const { id, token } = req.params;
    //get password
    const { password, confirmPassword } = req.body;
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
        return res.json({ status: "User Does not exists ! " });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
        //verifying secret
        const verify = jwt.verify(token, secret);
        if (password !== confirmPassword) {
            return res.json({ status: "Passwords do not match!" });
        }
        //we don't store password directly so we hash it 
        const encryptedPassword = await bcrypt.hash(password, 10);
        //to update the new password
        await User.updateOne({ _id: id }, {
                $set: {
                    password: encryptedPassword,
                },
            }

        );
        // res.json({ status: "Password Updated" });
        res.render("index", { email: verify.email, status: "Verified" });
    } catch (error) {
        console.log(error);
        res.json({ status: "Something went Wrong " });
    }
});