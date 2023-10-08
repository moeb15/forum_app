import { useState } from "react";

function AddPost(){
    const [ title,setTitle ] = useState("");
    const [ content,setContent ] = useState("");
    const [ tags,setTags ] = useState("");
    const addpost_url = "http://localhost:8000/api/posts";

    const submitPost = async(e) =>{
        e.preventDefault();
        if(title === "" || content === ""){
            alert("Both a title and post content are required to make a post")
            return
        }
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
        <div className="flex flex-col  text-gray-300 w-[60vh] sm:w-[100vh]
                        m-2 p-4 border-solid border-[0.1vh]
                        border-black shadow-md shadow-black
                        h-[100%]">
            <form className="flex flex-col h-[100%]" onSubmit={submitPost}>
                <input type="text" 
                    placeholder="Title" 
                    id="title" 
                    name="title"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    className="bg-black border-none rounded-none
                                 h-[0.4rem]"/>
                    
                <input type="text" 
                    placeholder="Content" 
                    id="content" 
                    name="content"
                    value={content}
                    onChange={e=>setContent(e.target.value)}
                    style={{height:"4rem"}}
                    className="bg-black border-none rounded-none
                                 overflow-auto"/>

                <input type="text" 
                    placeholder="Seperate with spaces" 
                    id="tags" 
                    name="tags"
                    value={tags}
                    onChange={e=>setTags(e.target.value)}
                    className="bg-black border-none rounded-none
                                h-[0.4rem]"/>
                    
                <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black">
                        Post
                </button>
            </form>
        </div>
    )
}

export default AddPost;