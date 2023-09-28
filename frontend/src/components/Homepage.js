import AddPost from "./AddPost";
import { useState,useEffect } from "react";
import ForumPost from "./ForumPost";

function Homepage(){
    const [ posts,setPosts ] = useState({});
    const getposts_url = "http://localhost:8000/api/posts/all"

    useEffect(() => {
        const getposts = async() => {
            const response = await fetch(getposts_url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();

            if(data.hasOwnProperty("error")){
                console.log("error");
            }
            setPosts(data.data);
        }
        getposts();
    },[])

    return(
        <div>
            <AddPost />
            {Array.from(posts).map((post, idx) => (
                <ForumPost props={post} key={idx}/>
            ))}
        </div>
    )
}

export default Homepage;