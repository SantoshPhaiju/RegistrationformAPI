const mongoose = require("mongoose");

const connectToDb = () =>{

    mongoose
    .connect("mongodb://localhost:27017/userregistrationapi")
    .then(() => console.log("Database successfully connected"))
    .catch((error) => console.log(error));
}

module.exports = connectToDb;