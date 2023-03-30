require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
//const passportStrategy = require("./passport");
const authRoute = require("./routes/auth");
const app = express();
//cookie session for storing session data in the user's browser as a cookie.
app.use(
    cookieSession({
        name: "session",
        keys: ["unknown"], //secret key used to sign cookie data
        maxAge: 24 * 60 * 60 * 100, //age of the cookie 24 h 
    })
);
//passport =  provides an easy-to-use framework for handling authentication and authorization in web applications.
//In addition to authentication, Passport also supports authorization, allowing you to restrict access to certain parts of your application based on the user's role or other factors.
//setting up application behavior 
app.use(passport.initialize()); //passport set up 
app.use(passport.session());
//cors=cross-Origin Resource Sharing a mechanism that allows a web page to access resources from a different domain
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE", //allowed methods
        credentials: true, //the browser can send cookirs and authentification headers with requests
    })
);
app.use("/auth", authRoute);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port${port}...`));