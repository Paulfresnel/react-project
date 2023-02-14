import service from "../../api/service"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddSouvenir.css'

function AddSouvenir(){
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [souvenir, setSouvenir] = useState({title:"",description:"",location:'', image:""})

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
        setSouvenir({...souvenir, image:response.fileUrl})
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  const handleChange = (e)=>{
    let name = e.target.name
    let value = e.target.value
    setSouvenir({...souvenir, [name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(imageUrl)
    service.createImage(souvenir)
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
        <div className="souvenir-form">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <label>Title:</label>
                <input onChange={(e)=>handleChange(e)} type="text" value={souvenir.title} name="title"></input>
                <label>Description:</label>
                <input onChange={(e)=>handleChange(e)} type="text" value={souvenir.description} name="description"></input>
                <label>Location:</label>
                <input onChange={(e)=>handleChange(e)} type="text" value={souvenir.location} name="location"></input>
                <label>Image URL:</label>
                <input onChange={(e)=>handleChange(e)} type='text' value={souvenir.image} ></input>
                <input onChange={(e)=>handleFileUpload(e)} type="file" name="image"></input>
                <button type="submit">Save New Souvenir</button>
            </form>
            <p style={{marginTop:"15px"}}>Here's the file you are uploading:</p>
            <img className="image-file" style={{width:"20rem", marginTop:"20px"}} src={souvenir.image}/>
        </div>
    )
}

export default AddSouvenir