const mongoose = require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");
const {Schema} = mongoose;
const validator = require("validator");

const UserSchema = Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    gender: {
        type: String, 
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("registeredusers", UserSchema);