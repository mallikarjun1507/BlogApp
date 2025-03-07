import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (response.ok) {
      fetchPosts();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Blog Posts</h1>
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post.id}>
            <PostItem post={post} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;