import { AiOutlineHome,AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

function Header(){
    const [ menu,setMenu ] = useState(false);
    const navigate = useNavigate();

    const logout = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    }

    const expandMenu = () => {
        setMenu(!menu)
    }
    
    return(
        <div className="fixed w-full h-[3vh] flex flex-row text-gray-300 mb-4">
            <AiOutlineMenu onClick={expandMenu}/>
            <div className={!menu ? "hidden" : ""}>
                <div className="w-full">
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
            </div>
            <SearchBar/>
        </div>
    )
}

export default Header;