import { useNavigate } from "react-router-dom";

function ForumPost({props}){
    const navigate = useNavigate();

    function expandPost(e){
        e.preventDefault();
        localStorage.setItem("current_post",props.ID);
        navigate("/post")
    }

    return(
        <div className="view-post">
            <button onClick={expandPost}>Expand</button>
            <h3 id="post-title">{props.title}</h3>
            <h4 id="post-created">{props.CreatedAt}</h4>
        </div>
    )
}

export default ForumPost;