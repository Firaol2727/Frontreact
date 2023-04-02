import React,{useState,useEffect} from 'react';
import NavbarAdmin from './adminNav';
import { Button, TextField, Typography ,CircularProgress} from '@mui/material';
import { Box } from '@mui/system';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
const AddCategory = () => {
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/special"
    });
    const [broadcategory,setbroadcategory]=useState([]);
    const [message,setMessage]=useState("");
    const [pid,setpid]=useState('');
    const [authorized,setauthorized]= useState(false);
    const [display,setdisplay]=useState(false);
    const [subcat,setSubcat]=useState('');
    const [name,setName]=useState('');
    const [bcat,setbcat]=useState('');
    const nav=useNavigate();
    useEffect(()=>{
        const api=axios.create({
            baseURL:"https://harenastore.onrender.com/special"
        });
        api.get('/categories',{
            withCredentials:true
        }).then(res=>{
    if(res.status===200)
        console.log(res);
        setbroadcategory(res.data);
        console.log(broadcategory);
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


    },[display])
    useEffect((nav)=>{
        const api=axios.create({
            baseURL:"https://harenastore.onrender.com/special"
        });
        api.get('/categories',{
            withCredentials:true
        }).then(res=>{
    if(res.status===200)
        console.log(res);
        setbroadcategory(res.data);
        console.log(broadcategory);
        setauthorized(true);
    }).catch(err=>{
    if (err.response) {
        console.log(err);
        setMessage("something went wrong may be duplicate value")
        
    } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log(err);
        
        setMessage("something went wrong may be duplicate value")
    } else {
        // Anything else
        // nav('/adlogin') 
        setMessage("something went wrong may be duplicate value")
        console.log(err);
    }
    });

    },[])

const handleSumbit= async(e)=>{
    e.preventDefault();
    setMessage('...loading')
    if(subcat===''||bcat===''){
        setMessage("please fields are required")
        return;
    }
    api.post('/addcategories',
        { subcat,bcat
    },
    {
    withCredentials:true
    }
).then(res=>{
    console.log(res.data);
    setMessage("successfully added !");
}).catch(err=>{
    if (err.response) {
    console.log("response error",err.response);
    setMessage("duplicate value !");
    } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log("request error");
        setMessage("duplicate value !");
    } else {
        // Anything else
        console.log(err);
        console.log("something went wrong ");
        setMessage("something went wrond !");
    }
    });
  
  
  }
const handleSumbitBroad= async(e)=>{
    e.preventDefault();
    setMessage('...loading')
    api.post('/addbroudcategories',
        { name
    },
    {
    withCredentials:true
    }
).then(res=>{
    console.log(res.data);
    setMessage("successfully broad category has been  added !");
}).catch(err=>{
    if (err.response) {
    console.log("response error",err.response);
    setMessage("this category is added before!");
    } else if (err.request) {
        // The client never received a response, and the request was never left
        console.log("request error");
        setMessage("something Went wrong");
    } else {
        // Anything else
        console.log(err);
        console.log("something  sub category is addedwent wrong ");
    }
    });
}
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
        color:"violet",
        fontWeight:"bold",
        }}> {display?"Add Category":"Add BroadCategory"}</Typography>
        <br/>
        <br/>
        <Button variant="outlined" onClick={()=>{
            setdisplay(!display)
        }} >{display?" Add BroadCategory":" Add SubCategory"}</Button>
        <br/>
        { display&&
        <form onSubmit={handleSumbit}>
            <p><b>{message}</b></p>
            
            <Autocomplete
        id="Region"
        freeSolo={false}
        onChange={(event, newValue) => {
            setbcat(newValue);
          }}
        options={broadcategory.map((option) => option.name)}
        name="Broad category"
        renderInput={(params) => <TextField {...params} label="Broad category" />}
      />
        <TextField required 
        label="categoryname" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setSubcat(e.target.value)}
        ></TextField>   
        <br/>
    <br/>   
        <Button type='submit' variant='contained' color="primary" >POST</Button>   
    </form>}
    {/******--------------- Add broad category ------------- */}
        <br/>
        <br/>
        {!display && <form onSubmit={handleSumbitBroad}>
            <p><b>{message}</b></p>
        <TextField required label="Broad category name" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} 
        onChange={(e)=>setName(e.target.value)}
        ></TextField>   
        <br/>
    <br/>   
        <Button type='submit' variant='contained' color="primary" >POST</Button>   
    </form>}

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

export default AddCategory;