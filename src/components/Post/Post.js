
import React, { useState , useEffect} from "react";
import ReactDom from "react-dom";

function Post(){

    const [error , setError] = useState(null);
    const [isLoaded , setIsLoaded] = useState(false);
    const [postList , setPostList] = useState([]);

    useEffect(() => {
        fetch("/v1/posts")
        .then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setPostList(result);
        },
        (error) => {
            setError(error)
            setIsLoaded(false);
            console.log(error);
        }
        )
        
    },[])

    if(error){
        return <div> Error !!! </div>
    } else if(!isLoaded){
        return <div> Loading... </div>
    }else{
        return (
            <ul>
                {postList.map((post) => (
                    <li> {post.title} {post.text} </li>
                ))}
            </ul>
        )
    }

     
}

export default Post;

