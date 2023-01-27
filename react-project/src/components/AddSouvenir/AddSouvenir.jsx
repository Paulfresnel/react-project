import service from "../../api/service"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSouvenir(){
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate()

     const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);
 
    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        console.log(response.fileUrl)
        // response carries "fileUrl" which we can use to update the state
        setImageUrl(response.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(imageUrl)
    service.createImage({title,description,location,imageUrl})
        .then(response=>{
            console.log("image added:" + response)
            setTitle('')
            setDescription('')
            setLocation('')
            setImageUrl('')
            navigate('/souvenirs')
        })
        .catch((err)=>console.log(err))
  }


    return(
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>Title:</label>
                <input onChange={(e)=>setTitle(e.target.value)} type="text" name="title"></input>
                <label>Description:</label>
                <input onChange={(e)=>setDescription(e.target.value)} type="text" name="description"></input>
                <label>Location:</label>
                <input onChange={(e)=>setLocation(e.target.value)} type="text" name="location"></input>
                <label>Image URL:</label>
                <input onChange={(e)=>handleFileUpload(e)} type="file" name="title"></input>
                <button type="submit">Save New Souvenir</button>
            </form>
        </div>
    )
}

export default AddSouvenir