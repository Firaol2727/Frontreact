import { Component } from "react";
import React from 'react';
import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import {CircularProgress, Typography} from "@mui/material";
import MoneyIcon from '@mui/icons-material/Money';
import { Button, ButtonGroup,Link } from "@mui/material";
import '../css/details.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Navbar from './Navbar';
import axios from "axios";
import { LocationOnSharp, Star } from "@mui/icons-material";

const Details = () => {
    const width=window.width;
    const pwidth=()=>{
        if(width<600){
            return `${width}`;
        }
        else{
            return "700px";
        }
    }
    const poid=useParams();
    const nav=useNavigate();
    let pid=poid.pid;
    const [open, setOpen] = useState(false);
    const handleClose = () => {
    setOpen(false);
    };
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/details"
    })
    const api1=axios.create({
        baseURL:"https://harenastore.onrender.com/custom"
    })
    // const id=useParams('id');
    const [pictures,setpictures]=useState([]);
    const [product,setProduct]=useState({});
    const [preview,setPreview]=useState(0);
    const [ordering,setordering]=useState(false);
    const handleOrder=()=>{
        setordering(true);
        api1.post("/order",{
            pid
        },
        {
            withCredentials:true
        }).then(res=>{
            if(res.status===200){
                setOpen(true);
                setordering(false);
            }
        })
        .catch(err=>{
            if(err.response.status===403){
                nav('/')
            }
        })

    }
    useEffect(()=>{
        api.get(`/${pid}`)
        .then(async res=>{
            if(res.status===200){
                let bd=res.data;
                let get={
                    pid:bd.pid,
                    CategoryCid:bd.CategoryCid,
                    SellerSid:bd.SellerSid,
                    description:bd.description,
                    marketprice:bd.marketprice,
                    price:bd.price,
                    pname:bd.pname
                }
                setProduct(get);
                console.log("the product is ",product);
                setpictures([...bd.Pictures]);
                setPreview(bd.Pictures[0].id)
                
            }
            })
            .catch(err=>{
            console.log(err)
            })
    },[])
    return (
        <div>  
            <Navbar/>
            <Box sx={{height:"60px"}}> </Box>
            <Stack direction={"row"} spacing={30}>
                <Box >
                <div className="details" >
                    <Stack direction={"column"}>
                    <div className="bigPicture" style={{
                                position:"relative",
                                backgroundColor:preview
                            }}>
                            <img
                            style={{
                                height: "380px",
                                width: "350px"
                            }}
                            src={`https://harenastore.onrender.com/images/${preview}`}
                            alt={"a"}
                        />
                        </div>
                        <Box  className="photo-list" sx={{
                            position:"relative",
                            marginleft:"50px",
                            marginTop:"20px"
                        }}>
                    {
                        pictures.map((item)=>(
                        <div key={item.id}
                        onClick={()=>{
                            setPreview(item.id)
                        }}
                        className="details"
                        style={{
                            height:"60px",
                            width:"60px",
                            position:"relative",
                            marginTop: "10px",
                            display: "inline-block",
                            marginLeft: "5px"
                        }}
                                            >
                        <img
                            height="60px"
                            width="60px"
                            src={`https://harenastore.onrender.com/images/${item.id}`}
                            alt={"a"}
                        />
                        </div>
                        ))
                    }
                </Box>
            </Stack>
                
                </div>
                <Box className="detailWords" sx={{
                    position:"relative",
                    margintop:"40px",
                    marginleft:"20px",
                    display: { xs: 'block', sm: 'none' }
                        }}> 
                    <h1>{product.pname}</h1>
                    <Stack direction={"row"} spacing={6}>
                        <Stack direction={"column"}>
                            <div style={{color:'grey'}}> Reviews</div>
                            <Stack direction={"row"}>
                                <Star sx={{color:'yellow'}}/> 
                                <Star sx={{color:'yellow'}}/> 
                                <Star sx={{color:'yellow'}}/> 
                                <Star sx={{color:'yellow'}}/>
                                <Star sx={{color:'grey'}}/>
                            </Stack >
                            <div><Typography variant="h6" underline="true" sx={{color:"green"}}> Back in Stock </Typography></div>
                        </Stack>
                        <Stack spacing={2}>
                            <div style={{
                            position:"relative",
                            height:"40px",
                            fontWeight:"bold",
                            borderColor:"red",
                        }}> 
                            <Stack direction={"row"} style={{color:"red"}}>
                                <MoneyIcon color="success"/>
                                { product.price+"Birr"}</Stack>
                                <del style={{color:"red",fontSize:"15px"}}>{product.marketprice}</del>
                        </div>
                        <div> <b>Order for delivery</b></div>
                        </Stack>
                        
                    </Stack>
                    <Stack direction={"row"}  >
                            <LocationOnSharp/>
                        <Typography variant="h6" underline="true" sx={{color:"grey"}}>AddisAbaba, Bole </Typography>
                    </Stack>
                    <br></br>
                    <p style={{
                        position:"relative",
                        width:pwidth,
                        marginLeft:"5px",
                     
                    }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic voluptatum eveniet soluta! Tempore architecto quae sint maiores at! Qui blanditiis
                     aliquid fuga et quis aliquam odio adipisci, aut at ea! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque laudantium repudiandae eveniet aliquam 
                     sapiente accusamus deleniti distinctio ullam officia exercitationem! Provident cupiditate iste aspernatur qui,
                      molestias repudiandae vitae maxime. Explicabo.
                    </p>

                    <Button variant="contained" onClick={handleOrder} sx={{
                            marginTop:"40px",
                            backgroundColor:"#147014",
                            width:"300px",
                        }} endIcon={<ShoppingBasketIcon />} disabled={ordering} >
                            Order
                        </Button>
                </Box>
                </Box>
                <Box sx={{display: { xs: 'none', sm: 'block' }}}>
                    <h1>{product.pname}</h1>
                    <Stack direction={"row"} style={{color:"red",fontWeight:"bolder" ,position:"relative"}}>
                                <MoneyIcon color="success" />
                                { product.price+"Birr"}
                                <b style={{ position:"realtive" ,marginleft:"20px",color:"green"
                                }}> | Back in Stock</b>
                                </Stack>
                    <del style={{color:"red",fontSize:"15px"}}>{product.marketprice}</del>
                    <p style={{position:"relative",width:"80%"}}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                        Eos laborum obcaecati vero quibusdam praesentium quae deleniti mollitia at
                        sed ullam rerum temporibus quia nostrum eaque, eius sunt, voluptates ratione exercitationem! 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, accusamus tempore.
                        Itaque recusandae laborum cupiditate autem reprehenderit natus ipsam ducimus maxime ea cum,
                        fugit fugiat quasi omnis possimus quam atque?
                        </p>
                        <p>provider :<Link href="#">Harme Industrial corporation </Link></p>
                        <Stack direction={"row"} sx={{position:"relative",marginTop:"20px",color:"grey"}} >
                            <LocationOnSharp/>
                        <Typography variant="h6" underline="true">AddisAbaba, Bole </Typography>
                        </Stack>
                        <table>
                            <td style={{backgroundColor:"#C2800F",height:"30px",width:"100px"}}></td>
                            <td style={{backgroundColor:"black",height:"30px",width:"100px"}}></td>
                            <td style={{backgroundColor:"#A46B09",height:"30px",width:"100px"}}></td>
                            <td style={{backgroundColor:"black",height:"30px",width:"100px"}}></td>
                            <td style={{backgroundColor:"#A46B09",height:"30px",width:"100px"}}></td>
                        </table>
                        <Button variant="contained" onClick={handleOrder} sx={{
                            backgroundColor:"#147014",
                            width:"300px",
                            marginTop:"50px",
                            marginLeft:"200px"
                        }} startIcon={<ShoppingBasketIcon />} disabled={ordering} >
                            Order
                        </Button>
                </Box>
            </Stack>
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle sx={{
            fontWeight:"bolder"
        }} id="alert-dialog-title">
          {"Harena.com "}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Thanks for your order!
            Dear customer.Our phone operators will reach you by phone to deliver your product 
            Enjoy our products !
        </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
            backgroundColor:"green"
        }}>
            <Button sx={{
                color:"white"
            }} onClick={handleClose} autoFocus>
                ok!
            </Button>
        </DialogActions>
            </Dialog>
            <footer style={{backgroundColor:"#282A3A",height:"100px",marginTop:"80px",width:"100%"}} >
            </footer>
        </div>
    );
}
export default Details;
