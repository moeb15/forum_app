import { useState }  from "react";
import { MdArrowDropDown,MdDelete,MdEdit } from "react-icons/md";
import "../styles/Dropdown.css";
import { useNavigate } from "react-router-dom";

function PostDropdown(){    
    const [ vis,setVis ] = useState("none");
    const navigate = useNavigate();

    function showMenu(e){
        e.preventDefault();
        if(vis === "none"){
            setVis("flex")
        }else{
            setVis("none")
        }
    }

    const onDelete = async() =>{
        const delete_url = `http://localhost:8000/api/posts/${localStorage.getItem("current_post")}`;
        const response = await fetch(delete_url,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })

        const data = await response.json()
        if(data.hasOwnProperty("error")){
            alert("Only the author can delete their posts");
            return;
        }
        alert("Sucessfully deleted");
        navigate("/home");      
    }
    

    return(
        <div className="dropdown-menu">
            <MdArrowDropDown onClick={showMenu}/>
            <div className="dropdown-options"
                 style={{display:vis}}>
                <MdEdit className="dropdown-btn"/>
                <MdDelete className="dropdown-btn"
                          onClick={onDelete}/>
            </div>
        </div>
    )
}

export default PostDropdown;