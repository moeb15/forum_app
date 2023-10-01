import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Header.css";
import { Link } from "react-router-dom";

function Header(){
    return(
        <div className="header">
            <Link className="header-links"
                  to="/user">
                <FaUserCircle />
            </Link>
            <Link className="header-links" 
                  to="/home">
                <AiOutlineHome />
            </Link>
        </div>
    )
}

export default Header;