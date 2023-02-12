import { useState,useEffect } from 'react'
import service from '../../api/service'
import axios from 'axios'
import "./SouvenirList.css"

const API_URL = process.env.REACT_APP_SERVER_URL

function SouvenirList(){
    const [souvenirs,setSouvenirs] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    const deleteSouvenir = (e)=>{
        const souvenirId = e.target.value
        const souvenirsArray = [...souvenirs]
        let filteredArray = souvenirsArray.filter(souvenir=>{
                    return souvenir._id !== souvenirId
                })
        setSouvenirs(filteredArray)
        axios.delete(`${API_URL}/api/souvenirs/${souvenirId}`)
            .then (response=>{
                console.log(response.data)
            })
    }

    useEffect(()=>{
    service.getImages()
        .then(imagesData=>{
            console.log(imagesData)
            setSouvenirs(imagesData)
            setIsLoading(false)
        })
    }, [])

    return(
        <div className='main-container-carousel' >

        <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
        {souvenirs.map((souvenir,index)=>{
           return <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} class="active" aria-current="true" aria-label={"Slide" +{index}}></button>
        })}
        </div>
  <div className="carousel-inner">
    
     
     {!isLoading && <div> {souvenirs.map((souvenir)=>{
    return <div className="carousel-item active">
        <img loading='lazy' src={souvenir.image} className="d-block w-100" alt="..."/>
        <div className="carousel-caption d-none d-md-block">
            <h5>{souvenir.title}</h5>
            <p>{souvenir.description}</p>
            <button value={souvenir._id} onClick={(e)=>deleteSouvenir(e)} className="btn btn-primary">Delete</button>
        </div>
    </div>
     }) }
     </div> 
     }
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        
    
  </div>
    )
}
export default SouvenirList