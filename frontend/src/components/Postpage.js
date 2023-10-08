import { useEffect, useState } from "react";
import Comment from "./Comment.js";
import AddComment from "./AddComment.js";
import PostDropdown from "./PostDropdown.js";

function Postpage(){
    const [ comments,setComments ] = useState({});
    const [ postdata,setPost ] = useState({});
    const [ isEdit,setEdit ] = useState(false);
    const [ title,setTitle ] = useState("");
    const [ content,setContent ] = useState("");
    const [ tags,setTags ] = useState("");

    let cmts = undefined
    let cmt_section = undefined
    useEffect(()=>{
        const getComments = async() => {
            const posturl = `http://localhost:8000/api/posts/${localStorage.getItem("current_post")}`;
            const response = await fetch(posturl,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
    
            const data = await response.json();
            setPost(data.data)
            setComments(data.data.Comments)
        }
        getComments();
        setTitle(postdata.title);
        setContent(postdata.content);
        setTags(postdata.tags);
    },[postdata.ID,postdata.title,postdata.content,postdata.tags])

    const submitEdit = async(e) => {
        e.preventDefault();
        const edit_url = `http://localhost:8000/api/posts/${localStorage.getItem("current_post")}`;

        const response = await fetch(edit_url,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                title:title,
                content:content,
                tags:tags
            })
        })

        const data = await response.json()
        if(data.hasOwnProperty("error")){
            alert(data.error)
        }
        window.location.reload()
    }

    if(comments !== undefined){
        cmts = Array.from(comments).map((cmt,idx) => (
            <Comment props={cmt} key={idx}/>
        ))

        cmt_section = <div className="flex flex-col m-2 p-4 border-solid border-[0.1vh]
                                    border-black shadow-md shadow-black text-left">
                        {cmts}
                      </div>
    }

    return(
        <div>
            <div className=" flex flex-col m-2 p-4 border-solid border-[0.1vh]
                        border-black shadow-md shadow-black h-[40vh] w-[60vh] sm:w-[100vh]
                        text-gray-300">
                <PostDropdown isEdit={isEdit} setEdit={setEdit}/>
                {!isEdit ? (
                <div className="post-data">
                    <h3 className="my-4 font-bold">{postdata.title}</h3>
                    <p className="font-light text-sm text-left italic my-2">{postdata.Username}</p>
                    <p style={{textAlign:"left"}}>{postdata.content}</p>
                </div>
                )
                :(
                <form className="flex flex-col mx-10 mb-12" onSubmit={submitEdit}>
                    <input type="text" 
                        name="title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}
                        className="bg-black border-none rounded-none h-[0.4rem]"/>
                        
                    <input type="text" 
                        id="content" 
                        name="content"
                        value={content}
                        className="bg-black border-none rounded-none h-[0.1rem]"
                        onChange={e=>setContent(e.target.value)}/>

                    <input type="text" 
                        id="tags" 
                        name="tags"
                        value={tags}
                        className="bg-black border-none rounded-none h-[0.4rem]"
                        onChange={e=>setTags(e.target.value)}/>
                        
                    <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black">
                        Save
                    </button>
                </form>)}
            </div>
            <AddComment/>
            {cmt_section}
        </div>
    )
}

export default Postpage;