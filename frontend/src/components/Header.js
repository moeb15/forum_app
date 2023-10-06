import { AiOutlineHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header(){
    const navigate = useNavigate();

    function logout(e){
        e.preventDefault();
        localStorage.setItem("token","");
        navigate("/");
    }
    
    return(
        <div className="fixed w-full h-[3vh] 
                        flex flex-row 
                        justify-end
                        px-4
                        bg-[#0a192f]
                        mb-5
                        text-gray-300">
            <div className="hidden md:flex flex-row justify-between
                            px-[1vh]">
                <SearchBar className="header-links"/>
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
    )
}

export default Header;