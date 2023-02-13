import { useState } from "react"
import { useNavigate } from "react-router-dom"
import service from "../../api/service"


function SignUp(){

    const [user, setUser] = useState({username:'', password:"", image:'', email:""})
    const [imageUrl,setImageUrl] = useState('')
    const [errorMessage,setErrorMessage] = useState('')
    const navigate = useNavigate()


    const handleChange = (e)=>{
        let name = e.target.name
        let value = e.target.value
        setUser({...user, [name]: value})
    }

    const handleFormSubmit =(e)=>{
        e.preventDefault()
        if (user.username === "" || user.password ==="" || user.email ===""){
          let message = "Please fill all the fields!"
          setErrorMessage(message)
          setTimeout(()=>{
            setErrorMessage("")
          }, 1500)
        }
        else {
        service
          .createUser(user)
          .then(response=>{
            console.log("response")
            navigate(`/profile`)
          })
          .catch(err=>console.log(err))
        }
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
            setUser({...user, image:response.fileUrl})
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    return(
        <div>
            <h2>test</h2>
            <form  onSubmit={(e)=>handleFormSubmit(e)} className="album-form">
  <div className="mb-3">
    <label className="form-label">Username</label>
    <input name="username" value={user.username} onChange={(e)=>handleChange(e)} type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email:</label>
    <input type="email" name="email" value={user.email} onChange={(e)=>handleChange(e)} cclassName="form-control" />
  </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" name="password" value={user.password} onChange={(e)=>handleChange(e)} cclassName="form-control" />
  </div>
  <div className="mb-3">
    <label className="form-label">Upload an Image</label>
    <input onChange={(e)=>handleFileUpload(e)} type="file" className="form-control"/>
    <input name='image' value={imageUrl} onChange={(e)=>handleChange(e)} type='text'className="form-control" placeholder="..or upload an image from internet"/>
      <img className='image-user' width={150} src={user.image}/>
  </div>
  {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default SignUp