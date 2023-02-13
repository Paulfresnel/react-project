// src/api/service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const auth = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/auth"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const getImages = () => {
  return api.get("/souvenirs")
    .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createImage = (newImage) => {
  return api.post("/souvenirs", newImage)
    .then(res => res.data)
    .catch(errorHandler);
};

const createAlbum = (newAlbum)=>{
  return api.post("/albums", newAlbum)
    .catch(errorHandler);
}

const createUser = (newUser)=>{
  return auth.post('/users', newUser)
    .catch(errorHandler)
}

export default {
  getImages,
  uploadImage,
  createImage,
  createAlbum,
  createUser
};
