function Comment({props}){
    return(
        <div>
            <p style={{fontWeight:"lighter", fontSize:"small"}}>{props.Username}</p>
            <p>{props.content}</p>
        </div>
    )
}

export default Comment;