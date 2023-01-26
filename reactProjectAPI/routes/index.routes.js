const router = require("express").Router();
const User = require('../models/User.model')

router.get("/users", (req, res, next) => {
  console.log(req)
  User.find()
    .then(data=>console.log(data))
  res.json("All good in here");
});

router.post('/users', (req,res,next)=>{
  console.log(req.body)
  console.log("received data:")
  const { username, email, password } = req.body
  console.log(username,email,password)
  User.create({username,email,password})
    .then(newUser=>{
      console.log("new user created")
      console.log(newUser)
    }) 
})

module.exports = router;