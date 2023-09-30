import { useState } from "react";
import "../styles/Posts.css";

function AddComment(){
    const [ content,setContent ] = useState("");
    const addcomment_url = "http://localhost:8000/api/posts/";

    const submitComment = async(e) =>{
        const addcomment_url = `http://localhost:8000/api/posts/${localStorage.getItem("current_post")}`;
        const response = await fetch(addcomment_url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                content:content
            })
        })

        const data = await response.json();
        window.location.reload();
    }

    return(
        <div className="forum-post-container">
            <form className="forum-post" onSubmit={submitComment}>                  
                <input type="text" 
                    placeholder="Content" 
                    id="content" 
                    name="content"
                    value={content}
                    onChange={e=>setContent(e.target.value)}/>       
                <button>Post</button>
            </form>
        </div>
    )
}

export default AddComment;