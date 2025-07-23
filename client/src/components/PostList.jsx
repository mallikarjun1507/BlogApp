import React, { useState, useEffect } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (error) {
      console.error(" Error fetching posts:", error.response?.data || error.message);
    }
  };

  
  useEffect(() => {
    fetchPosts();
  }, []);

  
  const addPost = async (post) => {
    if (!post.title.trim() || !post.content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", post);
      setPosts((prevPosts) => [res.data, ...prevPosts]); 
    } catch (error) {
      console.error("Error adding post:", error.response?.data || error.message);
      alert("Failed to add post.");
    }
  };

  return (
    <div>
      <PostForm onAddPost={addPost} />
      <div className="post-list">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post, index) => <PostItem key={index} post={post} />)
        )}
      </div>
    </div>
  );
};

export default PostList;
