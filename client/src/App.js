import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Login from "./components/login";  
import Signup from "./components/signup"; 

const Blog = () => {
  const handleCreatePost = async (post) => {
    const response = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      window.location.reload();
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand mb-0 h1">
            My Blog
          </Link>
          <div>
           </div>
        </div>
      </nav>
      <PostForm onSubmit={handleCreatePost} />
      <PostList />
    </div>
  );
};

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path="/signup" element={<Signup  />} />
          
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
