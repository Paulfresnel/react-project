import './CreateAlbum.css'

function CreateAlbum(){

    return(
        <div>
            <h2>test</h2>
            <form className="album-form">
  <div className="mb-3">
    <label className="form-label">Title</label>
    <input type="text" className="form-control"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Description</label>
    <textarea col="4" row='3' className="form-control" id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label className="form-label">Upload an Image</label>
    <input type="file" className="form-control"/>
    <input type='text'className="form-control" placeholder="..or upload an image from internet"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default CreateAlbum