import { useEffect,useState } from "react";
import Header from "./Header";
import ForumPost from "./ForumPost";

function UserHome(){
    const [ posts,setPosts ] = useState({});
    const user_url = "http://localhost:8000/api/posts"

    useEffect(()=>{
        const getData = async() => {
            const response = await fetch(user_url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await response.json()
            if(data.hasOwnProperty("error")){
                console.log("error");
            }
            setPosts(data.data)
        }
        getData();
    },[])

    console.log(posts)
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

export default UserHome;