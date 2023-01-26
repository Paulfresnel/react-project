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
        </div>
    )
}

export default Header