require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 8000
const connectToDb = require("./db");

connectToDb();
const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.send("Hello world");
});

// Available routes
app.use("/api/users", require("../routes/userregistration"));



app.listen(port, () =>{
    console.log(`Website is running on http://localhost:${port}`);
});