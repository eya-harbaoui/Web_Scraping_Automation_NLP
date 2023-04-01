require('dotenv').config();
//dotenv is a Node.js package that allows you to load environment variables from a .env file into the process.env object in Node.js and allow access lel .envfile .
const express = require('express');
const app = express();
const cors = require("cors");
//By calling the express() function, the app object is created and returned, which provides methods for defining middleware, routes, and handling HTTP requests and responses
//Once you have created an app instance, you can start defining your application's behavior by adding middleware functions and defining routes.
//kima ekl app..use w app.get app.listen .. called middleware functions.
const connection = require("./db")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
//DB connection
connection();
//middlewares
app.use(express.json()); // to parse (analy) incoming json requests typically used for handling POST, PUT, and PATCH requests, where the client sends data in the request body.
app.use(cors()); // CORS is a security feature built into web browsers that  allows you to specify which domains are allowed to make requests to your server.
//wl app.use(cors()) allow any domain to make requests to your server w kn nheb nlimiti nhot chneya domain origin w methods w allowedheaders f const w naaml app.use(cors(esm const))

//routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));