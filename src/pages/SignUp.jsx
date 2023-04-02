import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete,TextField } from '@mui/material';
import '../css/signup.css';
import axios from 'axios';
const SignUp = () => {
    const [phonenumber,setphonenumber]=useState('');
    const [password,setpassword]=useState('');
    const [cp,setcp]=useState(''); 
    const [error,seterror]=useState('')

    const nav=useNavigate();
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/custom"
      });
    const handleLogin=(e)=>{
        e.preventDefault();
        console.log("watching")
        console.log(password,cp)
        if(password==cp){
        api.post("/register",{
            phonenumber,password,cp
        }).then(res=>{
            seterror("success")
            nav('/home')
        }).catch(err=>{
            console.log(err);
            seterror("some thing went wrong")
        })

        }else{
            seterror("please fill the same password fields ")
        }
    }
    return ( 
        <div className="box">
            <form  onSubmit={handleLogin}>
            <center><img src="https://img.icons8.com/bubbles/100/000000/user.png" alt='User'/></center>
            <h3>Welcome</h3>
            <p className="tip">Let's create your free account now</p>
            <p style={{color:"red",fontWeight:"bold"}}>{error}</p>
            <label>PhoneNumber</label>
            <input type="text" required maxLength="13" onChange={(e)=>{
                setphonenumber(e.target.value)
            }} />
            <label>Password</label>
            <input type="password" required maxLength="20" onChange={(e)=>{
                setpassword(e.target.value)
            }}  />
            <label>confirm Password</label>
            <input type="password" required maxLength="20" onChange={(e)=>{
                setcp(e.target.value)
            }}  />
            <div className="btn">
            <button type="submit">Create account</button>
            </div>
            <hr/>
            <p className="mode">Already user?<a href="/">Login</a></p>
            <p>By processing, you're agree with our <a href="#">Terms and conditions</a> and <a href="#">Privacy policy</a>.</p>
            </form>
        </div>
     );
}
 
export default SignUp;