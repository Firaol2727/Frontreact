import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import React,{useState,useEffect,useMemo} from 'react';
import {useNavigate,useParams} from "react-router-dom";
import axios from "axios";
import { Box,TextField } from '@mui/material';
import { Stack } from '@mui/system';
import NavbarAdmin from './adminNav';
const EditOrder = () => {
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/special"
    })
    const orderid=useParams();
    const oid=orderid.oid;

    const [fresh,setfresh]=useState(false);
    const [data,setdata]=useState();
    const [loading,setloading]=useState("");
    const [found,setfound]=useState(false);
    const nav=useNavigate();
    const [amount,setamount]=useState();
    const [odescription,setodescription]=useState();
    const [deliveryfee,setdeliverfee]=useState();
    const handleDelete=()=>{
        setloading("deleting....");
        api.post('/deleteorder',
        {oid},
        {
            withCredentials:true
        }
    ).then(response=>{
        if(response.status===200){
            console.log(response);
            setloading("")
            nav(`/watchorder`)
        }
    }).catch(err=>{
        setloading("some error occured")
        console.log("The error is ",err);
    })
    }
    const handleDelivered=()=>{
        setloading("confirming delivery...")
        api.post('/orderdelivered',
        {oid},
        {
            withCredentials:true
        }
    ).then(response=>{
        if(response.status===200){
            console.log(response);
            setloading("")
            nav(`/watchorder`)
        }
        console.log(response);
        setloading("")
    }).catch(err=>{
        setloading("some error occured ")
        console.log("The error is ",err);
    })
    }
    const handleConfirmed=()=>{
        setloading("confirming...")
        api.post('/editorder',
            {oid,amount,odescription,deliveryfee},
            {
                withCredentials:true
            }
        ).then(response=>{
            if(response.status===200){
                setloading("")
                setfresh(!fresh)
            }
        
        }).catch(err=>{
            setloading("some error has occured ...")
            console.log("The error is ",err);
        })
    }
    
    useEffect(()=>{
        api.get(`/watchorder/${oid}`,
    {
      withCredentials:true
    }
  ).then(res=>{
    let bd=res.data;
    if(res.status===200){
        setfound(true);
        console.log(res);
        let bd=res.data;
        setdata(res.data);
        setamount(bd.amount);
        setodescription(bd.odescription);
        setdeliverfee(bd.deliveryfee)
    }
       // setErrmsg("Successfull login")
    console.log(res);
  }).catch(err=>{
    if (err.response) {
      nav('/adlogin') 
      console.log(err);
  } else if (err.request) {
      // The client never received a response, and the request was never left
      nav('/adlogin') 
      console.log(err);
  } else {
      // Anything else
      // nav('/adlogin') 
        console.log(err);
  }
  });
    },[fresh])
    return ( 
        <>
        <NavbarAdmin/>
        <div sx={{position:"absolute" ,
            top:"100px"}}
            >
            <Box>
                <br></br>
                <br></br>
        <TextField defaultValue={data.Customer.fname+" "+data.Customer.lname}  label="Customer" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField> 
        <TextField defaultValue={data.Customer.phone}  label="Customer Phone"sx={{
            marginLeft:"20px",
            marginTop:"10px",
        }}  ></TextField> 
        <br></br>
        <br></br>
        <TextField defaultValue={data.Product.pname} label="Product" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField> 
        <TextField defaultValue={data.Product.price}  label="Price" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField>
        <br></br>
        <br></br>
    
        <TextField defaultValue={data.Seller.managerFname+" "+data.Seller.manageLname} label="Seller Name" sx={{
            marginLeft:"20px",
            marginTop:"10px",
        
        }} ></TextField>
        <TextField defaultValue={data.Seller.companyName} label="Company" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            
        }} ></TextField>
        <br></br>
        <br></br>
        <TextField defaultValue={data.Seller.phoneNo} label="Phone Number" sx={{
            marginLeft:"20px",
            marginTop:"10px",
           
        }} ></TextField>
        <TextField defaultValue={data.Seller.city} label="Location" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            marginBottom:"30px"
        }} ></TextField>
        <br></br>
        <br></br>
        <TextField defaultValue={data.Seller.subcity} label="Subcity" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField> 
        <TextField defaultValue={data.Seller.slocation}  label="slocation" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }} ></TextField>
        <br></br>
        <br></br>
        <Box sx={{
                backgroundColor:"lightblue",
                justifyContent:'center',
                alignItems:"center"
        }}>
                <h2 style={{
                    color:"white"
                }}> Order Related Data Filling Form</h2>
        </Box>
        <br></br>
        <br></br>
        <h2> ORDER DESCRIPTION</h2>
        <br/>
        <p>{loading}</p>
        <textarea label="Description" placeholder={data.odescription} style={{
            marginLeft:"20px",
            marginTop:"10px",
            marginBottom:"30px",
            width:"80%",
            columns:5,
            paddinpxg:"4px"
        }} onChange ={(e)=>setodescription(e.target.value)} ></textarea>
        <br></br>
        <br></br>
        <TextField defaultValue={data.amount} type="number" label="Amount" sx={{
            marginLeft:"20px",
            marginTop:"10px",
            color:"red"
        }} 
        onChange={(e)=>{setamount(e.target.value)}}  ></TextField>
        <TextField defaultValue={data.deliveryfee} type="number"  label="Delivary fee" sx={{
            marginLeft:"20px",
            marginTop:"10px"
        }}
        onChange={(e)=>{setdeliverfee(e.target.value)}}  ></TextField>

        <br></br>
        <br></br>
        <Stack direction="row" spacing={20} >
        <Button  variant="contained" sx={{marginLeft:"20px",
            marginTop:"10px",backgroundColor:"blue",width:"200px",height:"50px"
            }} onClick={handleConfirmed}> <p style={{color:"white"}} >Confirm</p> </Button> 
        <Button variant="contained"color='success' sx={{ width:"200px",height:"50px",
            marginLeft:"20px",
            marginTop:"10px",
            backgroundColor:"green"
        }}onClick={handleDelivered}><p style={{color:"white"}} >Delivered</p> 
        </Button>
        <Button color='error' variant="contained" sx={{marginLeft:"20px",
            marginTop:"10px",backgroundColor:"red",width:"200px",height:"50px",
            }} onClick={handleDelete}><p style={{color:"white"  }} >Delete</p> </Button>
        </Stack>
        </Box>
        </div>
        
    </>);
}

export default EditOrder;