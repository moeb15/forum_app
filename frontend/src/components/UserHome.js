import { useEffect,useState } from "react";
import Header from "./Header";
import ForumPost from "./ForumPost";
import { FaUserCircle } from "react-icons/fa";
import "../styles/Userprofile.css";

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
            <div>
                <div className="user-icon">
                    <FaUserCircle size={70}/>
                    <h3>{localStorage.getItem("username")}</h3>
                </div>
                <div className="container">
                    <div className="user-posts">
                        {Array.from(posts).map((post, idx) => (
                            <ForumPost props={post} key={idx}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserHome;