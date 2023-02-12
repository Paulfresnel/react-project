import './Header.css'
import { Link } from 'react-router-dom'

function Header(){

    return(
        <div className="header flex">
        <Link to={"/"}>
    <img width={50} src="https://cdn-icons-png.flaticon.com/128/8304/8304806.png"/>
    </Link>
            <Link to={"/list"}>
    <img width={50} src='https://cdn-icons-png.flaticon.com/128/839/839860.png'/>
    </Link>
    <Link to={"/albums/create"}>
    <img width={50} src="https://cdn-icons-png.flaticon.com/512/9587/9587902.png"></img>
    </Link>
        </div>
    )
}

export default Header