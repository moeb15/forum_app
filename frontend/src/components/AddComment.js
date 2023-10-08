import { useState } from "react";


function AddComment(){
    const [ content,setContent ] = useState("");

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
        if(data.hasOwnProperty("data")){
            window.location.reload();
        }
    }

    return(
        <div className="flex flex-col m-2 p-4 border-solid border-[0.1vh]
        border-black shadow-md shadow-black">
            <form className="flex flex-col" onSubmit={submitComment}>                  
                <input type="text" 
                    placeholder="Content" 
                    id="content" 
                    name="content"
                    value={content}
                    onChange={e=>setContent(e.target.value)}
                    className="bg-black border-none rounded-none
                    overflow-auto"/>       
                <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black">
                    Post
                </button>
            </form>
        </div>
    )
}

export default AddComment;