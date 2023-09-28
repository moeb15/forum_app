function ForumPost({props}){

    return(
        <div className="view-post">
            <h3 id="post-title">{props.title}</h3>
            <h4 id="post-created">{props.CreatedAt}</h4>
        </div>
    )
}

export default ForumPost;