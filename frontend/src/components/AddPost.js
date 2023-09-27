import { useState } from "react";
import "../styles/Posts.css";

function AddPost(){
    const [ title,setTitle ] = useState("");
    const [ content,setContent ] = useState("");
    const [ tags,setTags ] = useState("");

    return(
        <div className="forum-post-container">
            <form className="forum-post">
                <input type="text" 
                    placeholder="Title" 
                    id="title" 
                    name="title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}/>
                    
                <input type="text" 
                    placeholder="Content" 
                    id="content" 
                    name="content"
                    value={content}
                    onChange={e=>setContent(e.target.value)}/>

                <input type="text" 
                    placeholder="Seperate with spaces" 
                    id="tags" 
                    name="tags"
                    value={tags}
                    onChange={e=>setTags(e.target.value)}/>
                    
                <button>Post</button>
            </form>
        </div>
    )
}

export default AddPost;