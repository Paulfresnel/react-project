const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")

// **** require Movie model in order to use it ****
const User = require('../models/User.model')
const {isAuthenticated} = require('../middlewares/jwt.middleware')

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

router.post('/users', (req,res,next)=>{
    console.log(req.body)
    console.log("received data:")
    const { username, email, password, image } = req.body
    console.log(username,email,password)
    User.create({username,email,password})
      .then(newUser=>{
        console.log("new user created")
        console.log(newUser) 
      }) 
  })

  router.get("/verify", isAuthenticated, (req,res)=>{
    const authorization = req.payload
    res.status(200).json(authorization)
  })

module.exports = router
