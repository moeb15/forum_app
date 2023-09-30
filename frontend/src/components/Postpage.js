import { useEffect, useState } from "react";
import Comment from "./Comment.js";
import AddComment from "./AddComment.js";

function Postpage(){
    const [ comments,setComments ] = useState({});
    const [ postdata,setPost ] = useState({});

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
            setComments(postdata.Comments)
        }
        getComments();
    },[postdata.ID])

    console.log(comments)

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
                <h3>{postdata.title}</h3>
                <p style={{textAlign:"left"}}>{postdata.content}</p>
            </div>
            <AddComment/>
            {cmt_section}
        </div>
    )
}

export default Postpage;