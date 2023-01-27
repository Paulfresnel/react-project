import { useState,useEffect } from 'react'
import service from '../../api/service'

function SouvenirList(){
    const [souvenirs,setSouvenirs] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
    service.getImages()
        .then(imagesData=>{
            console.log(imagesData)
            setSouvenirs(imagesData)
            setIsLoading(false)
        })
    }, [])

    return(
        <div>
    {isLoading && <p>Loading...</p>}
    {/* {!isLoading && <div>
        {souvenirs.map(souvenir=>{
            return <div>
                <img width={300} src={souvenir.imageUrl}/>
                <h1>{souvenir.title}</h1>
                <h2>{souvenir.description}</h2>
                <h3>{souvenir.location}</h3>
            </div>
        })}
    </div>} */}
    <div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner carousel-main">
    {souvenirs.map(souvenir=>{
        if (souvenir.imageUrl !== ""){
        return <div className="carousel-item active">
      <img src={souvenir.imageUrl} className="d-block carousel-image" alt={souvenir.description}/>
      <div className="carousel-caption d-none d-md-block">
        <h5>{souvenir.title}</h5>
        <p>{souvenir.description}</p>
        <p>{souvenir.location}</p>
      </div>
</div>
}
    })} 
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
    )
}
export default SouvenirList