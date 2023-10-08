import { useState }  from "react";
import { MdArrowDropDown,MdDelete,MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function PostDropdown({isEdit,setEdit}){    
    const [ vis,setVis ] = useState("none");
    const navigate = useNavigate();

    function showMenu(e){
        e.preventDefault();
        if(vis === "none"){
            setVis("flex");
        }else{
            setVis("none");
        }
    }
    
    function showEdit(){
        isEdit = !isEdit;
        setEdit(isEdit);
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
        <div className="text-left absolute">
            <MdArrowDropDown onClick={showMenu}/>
            <div className="flex flex-col"
                 style={{display:vis}}>
                <MdEdit className="mb-[1vh] cursor-pointer"
                        onClick={showEdit}/>
                <MdDelete className="mb-[1vh] cursor-pointer"
                          onClick={onDelete}/>
            </div>
        </div>
    )
}

export default PostDropdown;