import AddPost from "./AddPost";
import { useState,useEffect } from "react";

function Homepage(){
    const [ posts,setPosts ] = useState("");
    const getposts_url = "http://localhost:8000/api/posts"

    useEffect(() => {
        const getposts = async() => {
            const response = await fetch(getposts_url,{
                method:"GET",
                headers:{Authentication:`Bearer ${localStorage.getItem("token")}`}
            })
            const data = await response.json();
            if(data.hasOwnProperty("error")){
                console.log("error");
            }
            setPosts(JSON.stringify(data));
        }
        getposts();
    },[])
    
    console.log(posts)

    return(
        <div>
            <AddPost/>
        </div>
    )
}

export default Homepage;