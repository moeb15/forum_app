import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    function logout(e){
        e.preventDefault();
        localStorage.setItem("token","");
        navigate("/");
    }
    
    return(
        <div className="header">
            <Link className="header-links"
                  onClick={logout}>
                <BiLogOut />
            </Link>
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