import { useEffect, useState } from "react";
import ForumPost from "./ForumPost";
import Header from "./Header";

function SearchPage(){
    const [ posts,setPosts ] = useState({});

    useEffect(()=>{
        const getData = async() => {
            let title = localStorage.getItem("search_title");
            console.log(title);
            let tags = localStorage.getItem("search_tags");

            if(title !== ""){
                const search_url = `http://localhost:8000/api/posts/title?title=${title}`;
                const response = await fetch(search_url,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await response.json();
                if(data.hasOwnProperty("error")){
                    alert(data.error);
                    return;
                }else if(data.data.length === 0){
                    alert("No posts found");
                    return;
                }
                setPosts(data.data);
            }else if(tags !== ""){
                const search_url = `http://localhost:8000/api/posts/tags?tags=${title}`;
                const response = await fetch(search_url,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await response.json();
                if(data.hasOwnProperty("error")){
                    alert(data.error);
                    return;
                }else if(data.data.length === 0){
                    alert("No posts found");
                    return;
                }
                setPosts(data.data);
            }
        }
        getData();
    },[posts.ID]);

    return(
        <>
            <Header />
            <div>
                {Array.from(posts).map((post, idx) => (
                    <ForumPost props={post} key={idx}/>
                ))}
            </div>
        </>
    )
}

export default SearchPage;