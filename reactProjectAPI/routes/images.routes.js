// routes/movies.routes.js

const express = require("express");
const router = express.Router();

// **** require Movie model in order to use it ****
const Image = require("../models/Image.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");


// GET "/api/movies" => Route to list all available movies
router.get("/images", (req, res, next) => {
  Image.find()
    .then(moviesFromDB => res.status(200).json(moviesFromDB))
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
router.post('/images', (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  Image.create(req.body)
    .then(createdImage => {
      // console.log('Created new movie: ', createdImage);
      res.status(200).json(createdImage);
    })
    .catch(err => next(err));
});

module.exports = router;
