import { useEffect } from "react"
import axios from "axios"


function APICall(){

    useEffect(()=>{
        axios.get('http://localhost:5005/api/users')
            .then(data=> {
                console.log(data.data)
            })
            .catch(err=> console.log(err))
    }, [])

    return(
        <div>
            API CAll
        </div>
    )
}

export default APICall