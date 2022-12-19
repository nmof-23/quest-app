import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import Container from "@mui/material/Container";

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/v1/posts")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostList(result);
        },
        (error) => {
          setError(error);
          setIsLoaded(false);
          console.log(error);
        }
      );
  };

  useEffect(() => {
    refreshPosts();
  }, [postList]);

  if (error) {
    return <div> Error !!! </div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f5ff",
          height: "minContent",
        }}
      >
        <PostForm userId={1} userName={"ddd"} refreshPosts={refreshPosts} />
        {postList.map((post) => (
          <Post
            userId={post.userId}
            userName={post.userName}
            title={post.title}
            text={post.text}
          />
        ))}
      </div>
    );
  }
}

export default Home;
