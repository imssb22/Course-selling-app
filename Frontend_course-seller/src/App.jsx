// import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import './App.css'
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';
import Signin from "./Signin";
import Appbar from "./Appbar";
import Courses from './Courses';
import Addcourse from './Addcourse';
function App() {
  return (
    <div style={{backgroundColor: "#eeeeee"}}>
    
    <Router>
    <Appbar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Addcourse" element={<Addcourse />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
