import { useNavigate } from "react-router-dom";
import { CgArrowsExpandLeft } from "react-icons/cg";

function ForumPost({props}){
    const navigate = useNavigate();

    function expandPost(e){
        e.preventDefault();
        localStorage.setItem("current_post",props.ID);
        navigate("/post")
    }

    return(
        <div className="flex flex-col m-2 p-4 border-solid border-[0.1vh]
                        border-black shadow-md shadow-black">
            <CgArrowsExpandLeft onClick={expandPost}
                                className="cursor-pointer mb-4" />
            <p className="font-light text-sm text-left">
                {props.Username}
            </p>
            <p className="font-light text-sm text-left">
                Comments: {props.Comments === null? 0 : props.Comments.length}
            </p>
            <p className="font-light text-sm text-left">
                Tags: {props.tags === "" ? "None" : props.tags}
            </p>
            <h3 id="post-title">{props.title}</h3>
            <h4 id="post-created">{props.CreatedAt.substring(0,10)}</h4>
        </div>
    )
}

export default ForumPost;