import { AiOutlineHome,AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

function Header({isHidden}){
    const [ menu,setMenu ] = useState(false);
    const navigate = useNavigate();

    const logout = e => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
        window.location.reload();
    }

    const expandMenu = () => {
        setMenu(!menu)
    }
    
    return(
        <div className={!isHidden ? "fixed text-gray-300 mb-4 flex flex-row right-1 top-1 " :
                        "hidden"}>
            <SearchBar />
            <div>
                <AiOutlineMenu className="my-[1vh]" size={15} onClick={expandMenu}/>
                <div className={!menu ? "hidden" : "flex flex-col transition-all duration-200"}>
                    <div className="w-full">
                        <Link to="/home">
                            <AiOutlineHome size={15} className="my-2"/>
                        </Link>
                        <Link to="/user">
                            <FaUserCircle size={15} className="my-2"/>
                        </Link>
                        <Link onClick={logout}>
                            <BiLogOut size={15} className="my-2"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;