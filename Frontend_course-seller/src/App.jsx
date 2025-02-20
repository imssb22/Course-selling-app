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
import Course from './Course';
import Landing from './Landing';
import axios from 'axios';
import { useEffect } from 'react';
// import {Landing} from "./components/Landing.jsx";
import { userState } from "./store/atoms/user.js";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
// import { use } from 'react';
function App() {
  return (
    <RecoilRoot>
    <div style={{backgroundColor: "#eeeeee"}}>
    
    <Router>
    <Appbar />
    <InitUser></InitUser>
      <Routes>
      <Route path={"/"} element={<Landing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/Addcourse" element={<Addcourse />} />
        <Route path="/courses/:courseId" element={<Course />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
   
    </div>
    </RecoilRoot>
  );
}
function InitUser(){
    const init = async ()=> {
        try{
           const response = await axios.get('http://localhost:3000/admin/me',{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization" : "Bearer " + localStorage.getItem('token')
                }
           })
           if(response.data.username){
               setUser({
                  userEmail : response.data.username,
                  isLoading : false
               })
           }
           else{
               setUser({
                   isLoading : false,
                   userEmail : null
               })
           }
        }
        catch(e){
            setUser({
                isLoading : false,
                userEmail : null
            })
        }
    }
    useEffect(()=>{
        init();
    },[])
    return <> </>
}

export default App;
