import { useState } from 'react'
import './CreateAlbum.css'
import service from '../../api/service'
import { useNavigate } from 'react-router-dom'

function CreateAlbum(){

  const navigate = useNavigate()

  const [album, setAlbum] = useState({title:"", description:"", image:"", isPublic:false})
  const [imageUrl,setImageUrl] = useState('')
  const [errorMessage,setErrorMessage] = useState('')

  const handleFormSubmit =(e)=>{
    e.preventDefault()
    if (album.title === "" || album.description ==="" || album.image ===""){
      let message = "Please fill all the fields!"
      setErrorMessage(message)
      setTimeout(()=>{
        setErrorMessage("")
      }, 1500)
    }
    else {
    service
      .createAlbum(album)
      .then(response=>{
        console.log("response")
        console.log(response)
        const {album} = response
        navigate(`/albums/${album._id}`)
      })
      .catch(err=>console.log(err))
    }
  }

  const handleChange = (e)=>{
    let name = e.target.name
    let value = e.target.value
    setAlbum({...album, [name]: value})
  }

  const checkHandleChange = () =>{
    let change = !(album.isPublic)
    setAlbum({...album, isPublic: change})
  }

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
        setAlbum({...album, image:response.fileUrl})
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };




    return(
        <div>
            <h2>test</h2>
            <form  onSubmit={(e)=>handleFormSubmit(e)} className="album-form">
  <div className="mb-3">
    <label className="form-label">Title</label>
    <input name="title" value={album.title} onChange={(e)=>handleChange(e)} type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <textarea name="description" value={album.description} onChange={(e)=>handleChange(e)} col="4" row='3' className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Upload an Image</label>
    <input onChange={(e)=>handleFileUpload(e)} type="file" className="form-control"/>
    <input name='image' value={imageUrl} onChange={(e)=>handleChange(e)} type='text'className="form-control" placeholder="..or upload an image from internet"/>
      <img className='image-album' width={150} src={album.image}/>
  </div>
  <div className="mb-3 form-check">
    <input onChange={checkHandleChange} type="checkbox" className="form-check-input" />
    <label className="form-check-label" >Make the Album Public?</label>
  </div>
  {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default CreateAlbum