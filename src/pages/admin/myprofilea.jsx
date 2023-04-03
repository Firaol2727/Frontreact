import React,{ useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { Avatar, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import NavbarAdmin from "./adminNav"; 
import axios from 'axios';
import { Edit } from "@mui/icons-material";
const MyProfileA = () => {
  
    const [editMode,setEditMode]=useState(false);
    const [normal,setnormal]=useState(true);
    const [profiles,setProfiles]=useState();
    const [changepassword,setchangepassword]=useState(false);
    const [pp,setpp]=useState('');
    const [np,setnp]=useState('');
    const [cp,setcp]=useState('');
    //---//
    const [adfname,setadfname]=useState('');
    const [adlname,setadlname]=useState('');
    const [adtelphone,setadtelphone]=useState('');
    const [telUsername,settelUsername]=useState('');
    const [message,setmessage]=useState('');
    const [auth,setAuth]=useState(false);
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/special"
      }); 
    const nav=useNavigate();
    const handlechangepp=(e)=>{
        e.preventDefault();
        setmessage("...loading")
        console.log(
            adfname,adlname,adtelphone,telUsername
        );
        api.post('/changepp',{
            adfname,adlname,adtelphone,telUsername
        },{
            withCredentials:true
        }
      ).then(res=>{
        if(res.status===200)
        {
            setmessage("successfully updated profile")
        }
        }).catch(err=>{
            if (err.response) {
                setmessage("something went wrong");
            } else if (err.request) {
                setmessage("something went wrong");
            } else {
                // Anything else
            
                nav('/adlogin') 
                
            }
      });

    }
    const handlechangepassword=(e)=>{
        e.preventDefault();
        setmessage("...loading")
        if(np!==cp){
            setmessage("password should be the same ")
            return;
        }
        api.post('/changepassword',{
            pp,np,cp
        },{
            withCredentials:true
        }
      ).then(res=>{
        if(res.status===200)
        {
           setmessage("successfully updated")
        }
        }).catch(err=>{
            if (err.response.status==404) {
                nav('/adlogin') 
                
                console.log(err);
        } else if (err.response) {
            setmessage("wrong password");
      } 
      else if (err.request) {
        setmessage("we guess you are currently offline");
  }
      else {
          // Anything else
          console.log(err);
         
      }
      });

    }
    useEffect(()=>{
        console.log("running the use Effect")
        api.get('/getprofilea',{
            withCredentials:true
        }
      ).then(res=>{
        setAuth(true);
        if(res.status===200)
        {
            let received=[];
            let data=res.data
            received.push(res.data);
            setProfiles(data);
            setadfname( data.aFname)
            setadlname(data.aLname);
            setadtelphone(data.phonenumber);
            settelUsername(data.telUsername);          
            // console.log("profiles",profiles)
            // console.log(profiles[0]);
        }
        }).catch(err=>{
            if (err.response) {
                nav('/adlogin') 
                console.log(err);
        } else if (err.request) {
            nav('/adlogin') 

      } else {
          // Anything else
          console.log(err);
          nav('/adlogin') 
        
      }
      });
    
      },[normal])
    return ( 
        <>
        <>
        <NavbarAdmin/>
        <Box sx={{
        position:"absolute",

        width:"100%",
        height:"150px",
        backgroundColor:"#860C0C"
     }}>
        <Typography variant="h4" sx={{
            position:"absolute",
            left:"15%",
            top:"60px",
            color:"white",
            alignSelf:"center"
        }}> HARENA.com the leading Ecommerce Website !</Typography>
        </Box>
        <Avatar sx={{
            position:"absolute",
            left:"4%",
            width:"100px",
            top:"110px",
            height:"100px"
        }}></Avatar>
     <Button variant="contained" onClick={()=>{
       setEditMode(true) 
       setnormal(false)
       setchangepassword(false);
    } }  sx={{
        position:"absolute",
        top:"210px",
        left:"0%",
        width:"100px"
    }}> <Edit/> Edit</Button>
    <Button variant="contained" onClick={()=>{
       setchangepassword(true) 
       setnormal(false)
       setEditMode(false)
    } }  sx={{
        position:"absolute",
        top:"210px",
        left:"31%",
        ml:"5px",
        
    }}> <Edit/> Password</Button>
    <Button variant="contained" onClick={()=>{
       setEditMode(false)
       setnormal(true)
       setchangepassword(false)
     } } 
      
       sx={{
            position:"absolute",
            top:"210px",
            left:"70%",
            ml:"5px",
            width:"100px",
        }}> BACK</Button>
  
    {editMode && <Box sx={{
        position:"absolute",
        top:"36%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}>
        <form onSubmit={handlechangepp}>
        <h6><b>{message}</b></h6>
        <TextField  label="Manager FirstName" defaultValue={profiles.aFname} sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }}
        onChange={(e)=>setadfname(e.target.value)}
        ></TextField> 
        <TextField  label="Manager LastName"sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} defaultValue={profiles.aLname} 
        onChange={(e)=>setadlname(e.target.value)}
        ></TextField> 
        <br></br>
        <br></br>
        <TextField  label="TelegramUsername" defaultValue={profiles.telUsername} sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>settelUsername(e.target.value)}></TextField> 
        <TextField  label="Phone No"  defaultValue={profiles.phonenumber} sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setadtelphone(e.target.value)}></TextField>

        <br></br>
        <br></br>
         
        <Button type="submit">Edit</Button>
        
    </form>
    </Box>
    },
    {normal && <Box sx={{
        position:"absolute",
        top:"36%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}>
        
    <Typography>AdminName     --------------    {profiles.aFname+ "  " +profiles.aLname }</Typography>
    <br/>
    <br/>
    <Typography>PhoneNumber   --------------    {profiles.phonenumber} </Typography>
    <br/>
    <br/>
    <Typography>Tel username   --------------    {profiles.telUsername} </Typography>
    </Box>
    }
    {changepassword && <form onSubmit={handlechangepassword}
      
      style={{
        position:"absolute",
        top:"36%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}
     >
            <h6><b>{message}</b></h6>
        <TextField required label="oldpasswprd" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setpp(e.target.value)}
        ></TextField>   
        <TextField required label="newpassword" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setnp(e.target.value)}
        ></TextField>  
        <TextField required label="confirmpassword" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setcp(e.target.value)}
        ></TextField>  
        <br/>
    <br/>   
        <Button type='submit' variant='contained' color="primary" >POST</Button>   
    </form>}
    <br/>
    <br/>
    <br/>
        <div> ------</div>
    </>
    
    </>
   
    );
}

export default MyProfileA;