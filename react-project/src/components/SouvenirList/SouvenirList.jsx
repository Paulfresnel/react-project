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
    {!isLoading && <div>
        {souvenirs.map(souvenir=>{
            return <div>
                <img width={300} src={souvenir.imageUrl}/>
                <h1>{souvenir.title}</h1>
                <h2>{souvenir.description}</h2>
                <h3>{souvenir.location}</h3>
            </div>
        })}
    </div>}
    
  </div>
    )
}
export default SouvenirList