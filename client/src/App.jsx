import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { Container } from "@mui/material";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/postDetails/PostDetails"; 

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (
    <Container maxWidth="xl">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={<Auth />}
          />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
