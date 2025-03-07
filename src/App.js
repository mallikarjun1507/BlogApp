import React, { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

const App = () => {
  const handleCreatePost = async (post) => {
    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    console.log(response)
    if (response.ok) {
      // Refresh the post list
      window.location.reload();
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mb-0 h1">My Blog</span>
        </div>
      </nav>
      <PostForm onSubmit={handleCreatePost} />
      <PostList />
    </div>
  );
};

export default App;