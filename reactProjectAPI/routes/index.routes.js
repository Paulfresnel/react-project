const router = require("express").Router();
const User = require('../models/User.model')

router.get("/users", (req, res, next) => {
  console.log(req)
  User.find()
    .then(data=>{
      res.json(data)
      console.log(data)})
});



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
