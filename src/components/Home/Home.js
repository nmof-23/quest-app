import React,{useState ,useEffect} from 'react'
import {useParams} from "react-router-dom";
import Post from '../Post/Post';

function Home() {
  
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
            <div className='container'>
                Home !!
                {postList.map((post) => (
                     <Post title={post.title} text={post.text}/>
            
                ))}

            </div>
                
        )
    }  
 
  
}

export default Home