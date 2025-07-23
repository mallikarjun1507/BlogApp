import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog" element={<PostList />} />
      <Route path="/create" element={<PostForm />} />
    </Routes>
  );
}

export default App;
