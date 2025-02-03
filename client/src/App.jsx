import React from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import {Container} from "@mui/material";
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Auth from './components/auth/Auth';

const App = () => {
  
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App
