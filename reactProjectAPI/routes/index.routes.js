const router = require("express").Router();
const User = require('../models/User.model')

router.get("/users", (req, res, next) => {
  console.log(req)
  User.find()
    .then(data=>{
      res.json(data)
      console.log(data)})
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

router.delete('/users/:userId', (req,res,next)=>{
  const { userId } = req.params
  console.log(userId)
  User.findByIdAndDelete(userId)
    .then(data=>{
      console.log("user deleted")
      console.log(data)
    })
})

module.exports = router;
