import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/posts`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = async (updatedPost) => {
    await fetch(`http://localhost:5000/api/posts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    setPosts(posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
  };

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={handleDelete} onEdit={handleEdit} />
      ))}
    </div>
  );
};

export default PostList;
