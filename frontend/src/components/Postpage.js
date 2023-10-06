import { useEffect, useState } from "react";
import Comment from "./Comment.js";
import AddComment from "./AddComment.js";
import Header from "./Header.js";
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

        cmt_section = <div className="forum-post-container" 
                           style={{textAlign:"left"}}>
                        {cmts}
                      </div>
    }

    return(
        <div>
            <div className="forum-post-container">
                <PostDropdown isEdit={isEdit} setEdit={setEdit}/>
                {!isEdit ? (
                <div className="post-data">
                    <h3>{postdata.title}</h3>
                    <p style={{fontWeight:"lighter", fontSize:"small", textAlign:"left"}}>{postdata.Username}</p>
                    <p style={{textAlign:"left"}}>{postdata.content}</p>
                </div>
                )
                :(
                <form className="forum-post" onSubmit={submitEdit}>
                    <input type="text" 
                        name="title"
                        value={title}
                        onChange={e=>setTitle(e.target.value)}/>
                        
                    <input type="text" 
                        id="content" 
                        name="content"
                        value={content}
                        onChange={e=>setContent(e.target.value)}/>

                    <input type="text" 
                        id="tags" 
                        name="tags"
                        value={tags}
                        onChange={e=>setTags(e.target.value)}/>
                        
                    <button>Save</button>
                </form>)}
            </div>
            <AddComment/>
            {cmt_section}
        </div>
    )
}

export default Postpage;