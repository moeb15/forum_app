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
            <p style={{fontWeight:"lighter", fontSize:"small", textAlign:"left"}}>
                {props.Username}
            </p>
            <p style={{fontWeight:"lighter", fontSize:"small", textAlign:"left"}}>
                Comments: {props.Comments === null? 0 : props.Comments.length}
            </p>
            <h3 id="post-title">{props.title}</h3>
            <h4 id="post-created">{props.CreatedAt.substring(0,10)}</h4>
        </div>
    )
}

export default ForumPost;