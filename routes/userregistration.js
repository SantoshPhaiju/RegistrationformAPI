const express = require("express");
const router = express.Router();
const Register = require("../models/UserModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const jwt_secret = process.env.jwt_secret;

// Router 1: Register the user
router.post("/registeruser", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    gender,
    phone,
    age,
    password,
    cpassword,
  } = req.body;
  try {
    const checkEmail = await Register.findOne({ email: email });
    if (checkEmail) {
      res.status(400).send({ error: "Email Already exists" });
    } else {
      if (password === cpassword) {
        if (!validator.isEmail(email)) {
          res.status(400).send("Invalid Email");
        } else {
          const hashpassword = await bcrypt.hash(password, 10);
          const registereduser = await Register({
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            phone: phone,
            age: age,
            password: hashpassword,
          });
          console.log(registereduser);
          res.status(201).send({ result: registereduser });
          registereduser.save();
        }
      } else {
        res
          .status(400)
          .send({ error: "Password and Confirm Password do not match" });
      }
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
});


router.get("/login", async (req, res) =>{
  try {
    const user = await Register.findOne({email: req.body.email});
    if(!user){
      res.status(400).send({error: "Account not found"});
    }else{
      console.log(user);
      const loginpassword = await bcrypt.compare(req.body.password, user.password);
      if(loginpassword){
        const token = jwt.sign({_id: user._id}, jwt_secret, {
          expiresIn: "5000000 seconds"
        });
        res.status(200).send({token: token});
        console.log(token);
      }else{
        res.status(400).send({error: "Invalid Credential"});
      }
    }
  } catch (error) {
    res.status(500).send({error: "Internal Server Error"});
    console.log(error);
  }
});

router.get("/getuser", fetchuser,  async(req, res) =>{
  try {
    const userId = req.user._id;
    const user = await Register.findById(userId).select("-password");
    res.status(200).send({userdata: user});
    console.log(user);
  } catch (error) {
    res.status(500).send({error: "Internal Server Error"});
    console.log(error);
  }
})

module.exports = router;



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmVmYmRiODZlOWU5NzgxNWQyMWU2ZGIiLCJpYXQiOjE2NTk4Nzk0OTV9.2oEeogIvLswqW-kia-lo1XOFpu5F-4hE_iN-HjMpdU8

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmVmYzBhNDJkNTQzZjM5YTY2OGUyNzAiLCJpYXQiOjE2NTk4Nzk1OTd9.Rs61nEQJLo45DOcbEoHqObI8ZvODTikh5_gZFLEY-mY


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmVmYzBhNDJkNTQzZjM5YTY2OGUyNzAiLCJpYXQiOjE2NTk5NDIyNTR9.1G84U_O6Lk2MpEYpm7463ZAp1pzTv--Pab5oYbQLHbY