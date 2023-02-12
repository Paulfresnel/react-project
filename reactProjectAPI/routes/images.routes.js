// routes/movies.routes.js

const express = require("express");
const router = express.Router();

// **** require Movie model in order to use it ****
const Souvenir = require("../models/Souvenir.model");
const Album = require('../models/Album.model')

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");


// GET "/api/movies" => Route to list all available movies
router.get("/souvenirs", (req, res, next) => {
  Souvenir.find()
    .then(souvenirData => {
      console.log(souvenirData) 
      res.status(200).json(souvenirData)})
    .catch(err => next(err));
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

// POST '/api/movies' => for saving a new movie in the database
router.post('/souvenirs', (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  Souvenir.create(req.body)
    .then(createdImage => {
      console.log("souvenir created")
      // console.log('Created new movie: ', createdImage);
      res.status(200).json({souvenir: createdImage, message:"Souvenir Created"});
    })
    .catch(err => next(err));
});

router.delete('/souvenirs/:souvenirId', (req,res)=>{
  const {souvenirId} = req.params
  Souvenir.findByIdAndDelete(souvenirId)
    .then(response=>{
      res.json({message: "Entry deleted"})
    })
})

// ALBUMS Route

router.post('/albums', (req,res)=>{
  console.log(req.body)
  const {title, description, image, isPublic} = req.body
  Album.create({title,description,image, isPublic})
    .then(albumCreated=>{
      console.log(albumCreated)
      res.json({album:albumCreated.data})
    })
    .catch(err=>{
      console.log(err)
      res.json({message: {err}})
    })
})

module.exports = router;
