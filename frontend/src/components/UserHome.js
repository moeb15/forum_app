import { useEffect,useState } from "react";
import ForumPost from "./ForumPost";
import { FaUserCircle } from "react-icons/fa";

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
            <div className="flex flex-col items-center">
                <div className="z-[-1] m-2">
                    <FaUserCircle size={70}/>
                    <h3 className="py-2">{localStorage.getItem("username")}</h3>
                </div>
                <div>
                    <div className="sm:w-[100vh]">
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