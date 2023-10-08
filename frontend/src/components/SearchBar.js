import { useState }  from "react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


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
            <div className="text-sm text-gray-300">
                <form className="flex flex-col mx-[-78vh] sm:flex-row sm:mx-[-283vh] my-[-0.75em]
                                hover:sm:mx-[-220vh] duration-300 w-fit text-left"
                      onSubmit={search}>
                    <input type="text"
                        placeholder="Title" 
                        className="h-[3vh] w-[4em] rounded-none text-xs md:w-[30vh] bg-black mx-1"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}/>

                    <input type="text"
                        placeholder="Tags" 
                        className="h-[3vh] w-[4em] rounded-none text-xs md:w-[30vh] bg-black mx-1"
                        style={{height:""}}
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