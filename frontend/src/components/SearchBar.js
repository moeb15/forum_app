import { useState }  from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../styles/Posts.css";

function SearchBar({isEdit,setEdit}){    
    const [ vis,setVis ] = useState("none");
    const [ title,setTitle ] = useState("");
    const [ tags,setTags ] = useState("");
    const navigate = useNavigate();

    function showMenu(e){
        e.preventDefault();
        if(vis === "none"){
            setVis("flex");
        }else{
            setVis("none");
        }
    }
    
    function search(e){
        e.preventDefault();
        localStorage.setItem("search_title",title);
        localStorage.setItem("search_tags",tags);
        navigate("/search");
    }

    return(
        <div className="dropdown-menu">
            <HiSearch onClick={showMenu}/>
            <div className="dropdown-options"
                 style={{display:vis,
                         background:"gray"}}>

                <form className="search-form"
                      onSubmit={search}>
                    <input type="text"
                        placeholder="Search By Title" 
                        className="dropdown-btn"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}/>

                    <input type="text"
                        placeholder="Search By Tags" 
                        className="dropdown-btn"
                        value={tags}
                        onChange={e=>setTags(e.target.value)}/>
                    <button>Search</button>
                </form>
            </div>
        </div>
    )
}

export default SearchBar;