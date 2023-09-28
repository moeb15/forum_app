import { useState } from "react";
import "../styles/Posts.css";

function AddPost(){
    const [ title,setTitle ] = useState("");
    const [ content,setContent ] = useState("");
    const [ tags,setTags ] = useState("");
    const addpost_url = "http://localhost:8000/api/posts";

    const submitPost = async(e) =>{
        e.preventDefault();
        const response = await fetch(addpost_url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title,
                content,
                tags
            })
        })

        const data = await response.json()

        if(data.hasOwnProperty("error")){
            alert(data.error)
        }else{
            window.location.reload();
        }
    }

    return(
        <div className="forum-post-container">
            <form className="forum-post" onSubmit={submitPost}>
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