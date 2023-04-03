import { Box, Stack } from '@mui/system';
import Navbar from './Navbar';
import { Avatar, TextField, Typography,Button,CircularProgress } from '@mui/material';
import { Edit } from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';
import React,{ useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const harena3=require("../assets/images/Harena.com-1 (1).png");
const Profile=()=>{
    const [editMode,setEditMode]=useState(false);
    const [normal,setnormal]=useState(true);
    const nav=useNavigate();
    const [profiles,setProfiles]=useState({});
    const [changepassword,setchangepassword]=useState(false);
    const [fname,setfname]=useState('');
    const [lname,setlname]=useState('');
    const [telUname,settelUname]=useState('');
    const [email,setemail]=useState('');
    const [phone,setphone]=useState('');
    const [city,setCity]=useState('');
    const [region,setregion]=useState('');

    const [message,setmessage]=useState('');
    const [pp,setpp]=useState('');
    const [np,setnp]=useState('');
    const [cp,setcp]=useState('');
    const [authorized,setAuthorized]=useState(false);
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/custom"
    }); 
    const handlechangepp=(e)=>{
        e.preventDefault();
        setmessage("...loading")
        api.post('/changepp',{
            fname,lname,telUname,email,phone,city,region
        },
        {
            withCredentials:true
            }
    ).then(res=>{
        if(res.status===200)
        {
            setmessage("successfully updated profile")
        }
        }).catch(err=>{
            if (err.response.status===404) {
                console.log(err.response)
                
                setmessage("update failed");
            } else if (err.request) {
                setmessage("something went wrong");
            } else {
                setmessage("something went wrong");
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
            console.log(res);
           setmessage("successfully updated")
        }
        }).catch(err=>{
            console.log(err);
            setmessage("wrong password");
            if (err.response) {
                setmessage("wrong password");
                console.log(err);
        } else if (err.request) {
                setmessage("you are currently offline")
      } else {
          // Anything else
          console.log(err);
          nav('/adlogin') 
        
      }
      });
    }
    useEffect(()=>{
        console.log("running the use effect ");
        api.get('/getprofile',
        {
            withCredentials:true
        }
      ).then(res=>{
        setAuthorized(true);
        if(res.status===200)
        {
            let received=res.data;
            // received.push(res.data);
            setProfiles(received)
            console.log("received",received)
            console.log("profiles",profiles)
            setfname(received.fname);
            setlname(received.lname);
            settelUname(received.telUname);
            setemail(received.email);
            setphone(received.phone);
            setCity(received.city);
            setregion(received.region);
            console.log(profiles[0]);
        }
        }).catch(err=>{
            if (err.response.status===403) {
                nav('/')
                console.log(err);
        } else if (err.request) {
            console.log(err)
    } else {
          // Anything else
        console.log(err);
        // nav('/selleLogin') 
    }
    });
    },[normal,editMode])
    return (
        <>
        {authorized && <div className='profile'>
            <Navbar/>
            <Box sx={{
        position:"absolute",

        width:"100%",
        height:"150px",
        backgroundColor:"gray",
        backgroundImage:harena3
     
     }}>
            </Box>
        <Avatar sx={{
            position:"absolute",
            left:"4%",
            width:"100px",
            top:"110px",
            height:"100px",
            background:"brown"
        }}></Avatar>
    <Button variant="contained"onClick={()=>{
        setEditMode(true) 
        setnormal(false)
        setchangepassword(false);
        setmessage("")
    } }  sx={{
        position:"absolute",
        top:"230px",
        left:"0%",
        width:"100px"
    }}> <Edit/> Edit</Button>
    <Button variant="contained" onClick={()=>{
        setchangepassword(true) 
        setnormal(false)
        setEditMode(false)
    } }  sx={{
        position:"absolute",
        top:"230px",
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
            top:"230px",
            left:"70%",
            ml:"5px",
            width:"100px",
        }}> BACK</Button>
    {
        editMode&&<Box sx={{
        position:"absolute",
        top:"40%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}>
        <p>{message}</p>
        <form onSubmit={handlechangepp}>
        <TextField defaultValue={profiles.fname} placeholder= {profiles.fname} label=" FirstName" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setfname(e.target.value)
        }} ></TextField> 
        <TextField defaultValue={profiles.lname}   placeholder= {profiles.lname} label=" LastName"sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setlname(e.target.value)
        }} ></TextField> 
        <br></br>
        <br></br>
        <TextField defaultValue={profiles.telUname}  placeholder= {profiles.telUname} label="Telegram Username(optional)" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            settelUname(e.target.value)
        }} ></TextField>
          <TextField defaultValue={profiles.email}   placeholder= {profiles.email} label="Email(optional)" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setemail(e.target.value)
        }} ></TextField>
        <TextField defaultValue={profiles.phone}  placeholder= {profiles.phone} label="Phone Number" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setphone(e.target.value)
        }}></TextField>
        <br></br>
        <br></br>
        <TextField   placeholder= {profiles.city}  defaultValue={profiles.city} label="City" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setCity(e.target.value)
        }}></TextField>
        <br></br>
        <br></br>
        <TextField   placeholder= {profiles.region}  defaultValue={profiles.region} label="Region" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setregion(e.target.value)
        }}></TextField>

        
        <button type="submit">Editprofile</button>
        
    </form>
    <br/>
    <br/>
    <br/>
        <div> ------</div>
    </Box>}
    {
        normal &&<Box sx={{
        position:"absolute",
        top:"40%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}>
        <Box>
            <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} gap={4} >
                <Typography variant="h5" color={"ActiveCaption"} >FirstName   -   </Typography>
                <Typography variant="h6">{profiles.fname+" "+profiles.lname}</Typography >
            </Stack>
            <Stack direction={"row"} gap={4} >
                <Typography variant="h5" color={"ActiveCaption"}>Email    -    </Typography >
                <Typography variant="h6">{profiles.email}</Typography >
            </Stack>
            <Stack direction={"row"} gap={4} >
                <Typography variant="h5" color={"ActiveCaption"}>Telegram    -    </Typography >
                <Typography variant="h6">{profiles.telUname}</Typography >
            </Stack>
            <Stack direction={"row"} gap={4} >
                <Typography variant="h5" color={"ActiveCaption"}>PhoneNumber   -   </Typography >
                <Typography variant="h6">{profiles.phone}</Typography >
            </Stack>
            <Stack direction={"row"} gap={4} >
                <Typography variant="h5" color={"ActiveCaption"}>City     -  </Typography >
                <Typography variant="h6">{profiles.city}</Typography>
            </Stack>
            <Stack direction={"row"} gap={4} >
                <Typography variant="h5" color={"ActiveCaption"}>Region     -    </Typography >
                <Typography variant="h6">{profiles.region}</Typography >
            </Stack>
        </Stack>
    </Box>

    <br/>
    <br/>
    <br/>
        <div> ------</div>
    </Box>}
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
        <TextField required label="oldpasswprd"  sx={{
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
    {!authorized && <CircularProgress/>}

        </div>}
        </>
    );
}
export default Profile;