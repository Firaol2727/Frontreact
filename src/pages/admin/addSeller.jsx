import React,{useState,useEffect} from 'react';
import NavbarAdmin from './adminNav';
import { Button, TextField, Typography ,CircularProgress} from '@mui/material';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const AddSeller = () => {
  const api=axios.create({
    baseURL:"https://harenastore.onrender.com/special"
  });
  const [authorized,setauthorized]= useState(false);
  const [message,setmessage]=useState("")
  useEffect((nav)=>{
    const api=axios.create({
      baseURL:"https://harenastore.onrender.com/special"
    });
    api.get('/watchorder',{
      withCredentials:true
    }
  ).then(res=>{
    if(res.status===200)
      setauthorized(true);
  }).catch(err=>{
    if (err.response) {
      console.log(err);
      nav('/adlogin') 
     
  } else if (err.request) {
      // The client never received a response, and the request was never left
      console.log(err);
      nav('/adlogin') 
      
  } else {
      // Anything else
      // nav('/adlogin') 
      console.log(err);
  }
  });

  },[])
  const [managerFname,setmanagerFname]=useState('');
  const [manageLname,setmanagerLname]=useState('');
  const [companyName,setCompanyName]=useState('');
  const [phoneNo,setphoneNo]=useState('');
  const [location,setlocation]=useState('');
  const [region,setregion]=useState('');
  const [Stream,setStream]=useState('');
  const [city,setcity]=useState('');
  const [subcity,setsubcity]=useState('');
  const [password,setpassword]=useState('');
  const handleSumbit= async(e)=>{
    e.preventDefault();
    setmessage("loading....");
    api.post('/addseller',
        { managerFname,manageLname,companyName,
        phoneNo,region,city,subcity,
        Stream,location,password
      },
      {
        withCredentials:true
      }
    ).then(res=>{
      if(res.status===200){
        setmessage("seller successfully added");
        document.getElementsByClassName("input").reset();
      }
      console.log(res.data);
    }).catch(err=>{
      setmessage("something went wrong");
      if (err.response) {
        console.log("response error");
  
    } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log("request error");
    } else {
        // Anything else
        console.log("something went wrong ");
    }
    });
  
  
  }
  const regions = [
    { title: 'Oromia'},
    { title: 'AddisAbaba'},
    { title: 'Amhara'},
    { title: 'Afar' },
    { title: 'Somali' },
    { title: "Sidama" },
    { title: 'BenishangulGumuz'},
    { title: 'Gambella' },
    { title: "SNNP" },
    { title: 'DireDewa'}
]
    return ( 
      <>
      {
        authorized && 
        <>
          <NavbarAdmin/>
          <Box sx={{
        position:"absolute",
        top:"100px",
        left:"10%",
        width:"80%",
        ackgroundColor:"white",
    }}>
      <Typography variant="h4" sx={{
        color:"brown",
        fontWeight:"bold",
      }}> Add Our Seller</Typography>
      <h6>{message}</h6>
      <br/>
      <br/>
        <form onSubmit={handleSumbit}>
        <TextField className='input' label="Manager FirstName" required sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setmanagerFname(e.target.value)}
        ></TextField> 
        <TextField className='input' required label="Manager LastName"sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setmanagerLname(e.target.value)}
         ></TextField> 
        <br></br>
        <br></br>
        <TextField className='input' required  label="CompanyName" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setCompanyName (e.target.value)}
        ></TextField> 
        <TextField className='input' required label="Phone No" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setphoneNo (e.target.value)}
        ></TextField>
        <br></br>
        <br></br>
        <Autocomplete
        id="Region"
        freeSolo={false}
        options={regions.map((option) => option.title)}
        onChange={(event, newValue) => {
          setregion(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Region" />}
      />
        <br></br>
        <br></br>
        <TextField className='input' required  label="City" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }}
        onChange={(e)=>setcity (e.target.value)}
         ></TextField>
         <br></br>
        <br></br>
        <TextField className='input' required  label="Subcity" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }}
        onChange={(e)=>setsubcity (e.target.value)}
         ></TextField>
        <TextField className='input' required  label="Stream" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            marginBottom:"30px"
        }} 
        onChange={(e)=>setStream(e.target.value)}
        ></TextField>
        <br></br>
        <br></br>
        <TextField className='input' required label="PassWord" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            marginBottom:"30px"
        }} 
        onChange={(e)=>setpassword(e.target.value)}
        ></TextField>
        <TextField className='input'  required label="Location" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            marginBottom:"30px"
        }} 
        onChange={(e)=>setlocation(e.target.value)}
        ></TextField>
        <Button type='submit' variant='contained' color="primary" >POST</Button>   
    </form>
    <br/>
    <br/>
    <br/>
        <div> ------</div>
         </Box>
        </>
      },
      {!authorized && <CircularProgress/>}
      </>
     );
}

export default AddSeller;