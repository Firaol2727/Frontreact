import { Avatar, TextField, Typography,Button,CircularProgress } from '@mui/material';
import { Edit } from "@mui/icons-material";
import { Box } from '@mui/system';
import NavbarSeller from './navbarSeller';
import Autocomplete from '@mui/material/Autocomplete';
import React,{ useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const MyProfile = () => {
    const [editMode,setEditMode]=useState(false);
    const [normal,setnormal]=useState(true);
    const nav=useNavigate();
    const [profiles,setProfiles]=useState({});
    const [changepassword,setchangepassword]=useState(false);
    const [managerFname,setmanagerFname]=useState('');
    const [manageLname,setmanageLname]=useState('');
    const [companyName,setcompanyName]=useState('');
    const [phoneNo,setphoneNo]=useState('');
    const [region,setregion]=useState('')
    const [message,setmessage]=useState('');
    const [city,setCity]=useState('');
    const [subcity,setsubcity]=useState('');
    const [slocation,setslocation]=useState('');
    const [pp,setpp]=useState('');
    const [np,setnp]=useState('');
    const [cp,setcp]=useState('');
    const [authorized,setAuthorized]=useState(false);
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/sel"
    }); 
    const handlechangepp=(e)=>{
        e.preventDefault();
        setmessage("...loading")
        api.post('/changepp',{
            managerFname,manageLname,phoneNo,companyName,city
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
                // console.log(err.response)
                nav('/sellerLogin') 
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
           setmessage("successfully updated")
        }
        }).catch(err=>{
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
            // console.log("received",received)
            console.log("profiles",profiles)
            setmanagerFname(received.managerFname)
            setmanageLname(received.manageLname)
            setphoneNo(received.phoneNo)
            setcompanyName(received.companyName)
            setCity(received.city)
            setsubcity(received.subcity)
            setslocation(received.slocation)
            // console.log(profiles[0]);
        }
        }).catch(err=>{
            if (err.response) {
                nav('/sellerLogin') 
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
    <>
    <NavbarSeller/>
    <Box sx={{
        position:"absolute",

        width:"100%",
        height:"150px",
        backgroundColor:"gray"
     }}>
        <Typography variant="h6" sx={{
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
            height:"100px",
            background:"brown"
        }}></Avatar>
    <Button variant="contained" onClick={()=>{
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
        top:"35%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}>
        <p>{message}</p>
        <form onSubmit={handlechangepp}>
        <TextField defaultValue={profiles.managerFname} label="Manager FirstName" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setmanagerFname(e.target.value)
        }} ></TextField> 
        <TextField defaultValue={profiles.manageLname} label="Manager LastName"sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setmanageLname(e.target.value)
        }} ></TextField> 
        <br></br>
        <br></br>
        <TextField defaultValue={profiles.companyName} label="CompanyName" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setcompanyName(e.target.value)
        }} ></TextField> 
        <TextField defaultValue={profiles.phoneNo}label="Phone No" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setphoneNo(e.target.value)
        }}></TextField>
        <br></br>
        <br></br>
        <TextField    defaultValue={profiles.city} label="City" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setCity(e.target.value)
        }}></TextField>
        <br></br>
        <br></br>
        <TextField defaultValue={profiles.companyName} label="Sub City" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setsubcity(e.target.value)
        }} ></TextField> 
        <TextField defaultValue={profiles.phoneNo}label="Special Location" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} onChange={(e)=>{
            setslocation(e.target.value)
        }}></TextField>
        <br></br>
        
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
        top:"35%",
        left:"10%",
        width:"80%",
        backgroundColor:"white",

    }}>
        <Box>
        <TextField defaultValue={profiles.managerFname} disabled label="Manager FirstName" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField> 
        <TextField defaultValue={profiles.manageLname} disabled label="Manager LastName"sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }}  ></TextField> 
        <br></br>
        <br></br>
        <TextField defaultValue={profiles.companyName} disabled label="CompanyName" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField> 
        <TextField defaultValue={profiles.phoneNo} disabled label="Phone No" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField>
        <br></br>
        <br></br>
        <TextField defaultValue={profiles.region} disabled label="Region" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField>
        <br></br>
        <br></br>
        <TextField defaultValue={profiles.city} disabled label="City" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField>
        <TextField defaultValue={profiles.Stream}disabled label="Stream" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            marginBottom:"30px"
        }} ></TextField>
        <TextField defaultValue={profiles.subcity} disabled label="Sub-city" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField> 
        <TextField defaultValue={profiles.slocation} disabled label="Slocation" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField>
        <br></br>
        <br></br>
        
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
    </> 

    </>
    );
}

export default MyProfile;