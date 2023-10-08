import { useState }  from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "../styles/Posts.css";

function SearchBar({isEdit,setEdit}){    
    const [ title,setTitle ] = useState("");
    const [ tags,setTags ] = useState("");
    const navigate = useNavigate();


    function search(e){
        e.preventDefault();
        localStorage.setItem("search_title",title);
        localStorage.setItem("search_tags",tags);
        navigate("/search");
    }

    return(
            <div className="bg-none text-sm text-gray-300">
                <form className="flex flex-row bg-none"
                      onSubmit={search}>
                    <input type="text"
                        placeholder="Title" 
                        className="h-[3vh] w-[15vh] md:w-[30vh] bg-black"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}/>

                    <input type="text"
                        placeholder="Tags" 
                        className="h-[3vh] w-[15vh] md:w-[30vh] bg-black"
                        value={tags}
                        onChange={e=>setTags(e.target.value)}/>
                    <button>
                        <HiSearch size={15}/>
                    </button>
                </form>
            </div>
    )
}

export default SearchBar;