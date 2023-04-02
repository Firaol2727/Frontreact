import React from 'react';
import { useRef,useState, } from 'react';
import '../css/login.css';
import axios from 'axios';
import { AppBar, Box } from "@mui/material";
import { Stack } from '@mui/system';
import {useNavigate} from "react-router-dom";
const log1 = require('../assets/images/harena3.png');
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
        <Box sx={{
          position:"absolute",
          width:"100%",
          height:"100%",
          backgroundColor:"#05052f" 
        }}>
          <AppBar sx={{
            backgroundColor:"#05052f",
          }}>.
          </AppBar>
        {
           success?( <p>Logged in </p>):(
            <Stack direction={"row"} spacing={5}>
          <Box sx={{
            left:"0%",
            width:"50%",
            height:"100%",
            display:{xs:"none",sm:"block"},
    
          }}>
          <img src={log1}alt="User" width="100%" height="100%" />
          </Box>
        <div className="box" style={{
          marginTop:"50px",
          height:"500px"
        }}>
          <form  onSubmit={handleSumbit}>
          <center><img src="https://img.icons8.com/bubbles/100/000000/user.png" alt="User" /></center>
          <h3>Welcome back</h3>
          <p className="tip">Let's login with your account details</p>
          <p style={{color:"red"}}>{errMsg}</p>
          <label>Phonenumber</label>
          <input type="phonenumber" required
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
           </Stack>)} 
        </Box>
       )} 
    </>
  );
}
 
export default LoginPage;