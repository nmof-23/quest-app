
import React, { useState , useEffect} from "react";
import ReactDom from "react-dom";
import "./Post.scss";

function Post(props){

    const {title  , text} = props;

    return(
        <div className="postContainer">
            {title}
            {text}
        </div>

    )

     
}

export default Post;

 