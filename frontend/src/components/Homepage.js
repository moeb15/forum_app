import AddPost from "./AddPost";
import { useState,useEffect } from "react";
import ForumPost from "./ForumPost";

function Homepage(){
    const [ posts,setPosts ] = useState({});
    const [ page,setPage ] = useState(1);

    useEffect(() => {
        const getposts = async() => {
            const getposts_url = `http://localhost:8000/api/posts/all?page=${page}`;
            const response = await fetch(getposts_url,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();

            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }else if(data.data.length === 0 && page !== 1){
                alert("Last page");
                setPage(page-1);
                return;
            }
            setPosts(data.data);
        }
        getposts();
    },[page])

    return(
        <>
            <div>
                <AddPost />
                {Array.from(posts).map((post, idx) => (
                    <ForumPost props={post} key={idx}/>
                ))}
            <div>
                    <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black mx-2"
                        onClick={()=>{
                            if(page === 1){
                                setPage(1);
                            }else{
                                setPage(page-1)
                            }
                        }}>
                        Prev
                    </button>
                    <button className="text-gray-300 bg-black rounded-md
                                    h-[5vh] hover:bg-gray-400 duration-300
                                    hover:text-black mx-2"
                        onClick={()=>{setPage(page+1)}}>
                        Next
                    </button>
            </div>
            </div>
        </>
    )
}

export default Homepage;