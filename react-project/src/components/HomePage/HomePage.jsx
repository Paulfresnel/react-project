import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function HomePage(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')

const createNewUser = (event)=>{
    event.preventDefault()
    axios.post('http://localhost:5005/api/users', {username,email,password})
        .then(data=>{
            console.log(data)
            console.log("user created")
        })
    console.log(username, email, password)
}

    return(
        <div>
        <Link to={"/souvenirs/create"}>
        <button>Create a Souvenir</button>
        </Link>
        <h1>Create a New User:</h1>
            <form onSubmit={(e)=>createNewUser(e)}>
            <label>Username:</label>
            <input onChange={(e)=>setUsername(e.target.value)} type="text" name="username"></input>
            <label>Email:</label>
            <input onChange={(e)=>setEmail(e.target.value)}  type="email" name="email"></input>
            <label>Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)}  type="password" name="password"></input>
            <button >Create User</button>
            
            </form>
        </div>
    )
}

export default HomePage