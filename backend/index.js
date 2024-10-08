const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv/config.js");

const port = 8001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const fs = require('fs')
// Static files
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

// Database connection
mongoose.connect('mongodb+srv://dixitsangani303:1F0sB0f3WAAAWDgE@cluster0.envakky.mongodb.net/food-del', {
    useNewUrlParser: true
})
    .then((res) => {
        console.log("Db is online connect");
    })
    .catch((err) => {
        console.log(err)
    })


app.use("/admin", require("./Routes/API/Food_List/Food_List"));

app.use("/user", require('./Routes/API/Food_List/User'));
app.use("/cart", require("./Routes/API/Food_List/Cart"));

app.use("/order", require("./Routes/API/Food_List/order"))

// Root route
app.get("/", (req, res) => {
    res.send("API working");
});

// Server
app.listen(port, (err) => {
    if (err) {
        console.error("Server error:", err);
    } else {
        console.log("Server is running on port", port);
    }
});
