import { useEffect, useState } from "react"
import axios from "axios"


function APICall(){
    const [users,setUsers] = useState([{}])
    const [isLoading,setIsLoading] = useState(true)

    const deleteUser = (e)=>{
        const userId = e.target.value
        console.log(userId)
        axios.delete(`http://localhost:5005/api/users/${userId}`)
        const copyOfUsers = [...users]
        const newCopyOfUsers = copyOfUsers.filter(user=>{
            return user._id !== userId
        })
        setUsers(newCopyOfUsers)
    }

    useEffect(()=>{
        axios.get('http://localhost:5005/api/users')
            .then(data=> {
                console.log(data.data)
                setUsers(data.data)
                setIsLoading(false)
                
            })
            .catch(err=> console.log(err))
    }, [])

    return(
        <div>
        {isLoading && <div><p>Loading...</p>
        <img src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif"/>
        </div>}
        {!isLoading && <div>
            {users.map(user=>{
                return <div className="card">
                    <h1>{user.username}</h1>
                    <h2>{user.email}</h2>
                    <button value={user._id} onClick={(e)=>deleteUser(e)}>Delete</button>
                </div>
            })}
        </div>}
        </div>
    )
}

export default APICall