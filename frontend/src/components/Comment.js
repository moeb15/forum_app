function Comment({props}){
    return(
        <div>
            <p className="font-light text-sm italic my-2">{props.Username}</p>
            <p className="my-1">{props.content}</p>
        </div>
    )
}

export default Comment;