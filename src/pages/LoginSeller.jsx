import React from 'react';
import { Link } from 'react-router-dom';
import { useRef,useState,useEffect } from 'react';
import '../css/login.css';
import axios from 'axios';
import {Navigate,Outlet } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
const api=axios.create({
  baseURL:"https://harenastore.onrender.com/sel/"
});

const LoginPage = () => {
  const nav=useNavigate();
  const useref=useRef();
  const errRef=useRef();
  const [password,setPassword]=useState('');
  const [phonenumber,setphonenumber]=useState('');
  const [errMsg,setErrmsg]=useState('');
  const [success,setSuccess]=useState(false);
  const handleSumbit=async (e)=>{
    setErrmsg("...Loading")
    e.preventDefault();
    api.post('/login',
      {
        phonenumber,password
      }, 
      {
        withCredentials:true
      }
    ).then(res=>{
      if(res.status==200)
      nav('/selhome')
      // setErrmsg("Successfull login")
      console.log(res);
    }).catch(err=>{
      if (err.response) {
        console.log("response error");
        setErrmsg("Error username or password")
    } else if (err.request) {
        // The client never received a response, and the request was never left
        setErrmsg("We think you are currently offline")
    } else {
        // Anything else
        console.log("something went wrong ");
    }
    });
  }
  useRef(()=>{
      useref.current.focus();
  },[])
  useRef(()=>{
    setErrmsg('');
  },[phonenumber,password])
  return ( 
    <>
    {
       success?( <p>Logged in </p>):(
    <div className="box">
      <form  onSubmit={handleSumbit}>
      <center><img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="User" /></center>
      <h3>Welcome back</h3>
      <p className="tip">Let's login with your account details</p>
      <p style={{color:"red"}}>{errMsg}</p>
      <label>Phonenumber</label>
      <input type="phonenumber" required maxLength="13"
          onChange={(e)=>setphonenumber(e.target.value)}
      />
      <label>Password</label>
      <input type="password" required 
        onChange={(e)=>setPassword(e.target.value)}
      />
      <div className="btn">
      <button type="submit" >Login</button>
      <a href="/forget" className="ll">Forget password? </a>
      <a href="/" className="ll">Login as Buyer? </a>
      <br></br>
      </div>
      <hr/>
      <p className="mode">New user?<a href="/signup"> Signup</a></p>
      <p>By processing, you're agree with our <a href="#">Terms and conditions</a> and <a href="#">Privacy policy</a>.</p>
      </form>
    </div>
       )} 
    </>
  );
}
 
export default LoginPage;