import React,{useState,useEffect} from 'react';
import {Box,Button,Link} from '@mui/material';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {Delete, ShoppingCart} from '@mui/icons-material';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import { Stack } from '@mui/system';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
const api=axios.create({
  baseURL:"https://harenastore.onrender.com/custom"
})
const z= (x)=>{
  if(x<600) return "175px";
  else  return "250px";
}
const y= (x)=>{
  if(x<600) return 2;
  else if (x<1000) return 3;
  else  return 5;
}
var width = window.innerWidth;
export default function Cart() {
  const [dense, setDense] = React.useState(false);
  const [carts,setcarts]=useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
  setOpen(false);
  };
  const nav=useNavigate();
  const [loaddelete,selloadelete]=useState(false);
  const handleDeleteCart=(cid)=>{
    console.log("deleting cart cid ",cid);
    api.post('/delcart',{cid},{
      withCredentials:true
    }).then(res=>{
      if(res.status==200){
          selloadelete(!loaddelete);
      }
    })
  }
  const handleOrder=(pid)=>{
    api.post("/order",{
        pid
    },
    {
        withCredentials:true
    }).then(res=>{
        if(res.status===200){
            setOpen(true);
        }
    })
    .catch(err=>{
        if(err.response.status===403){
            nav('/')
        }
    })

}

  useEffect(()=>{
      api.get('/cart',{
        withCredentials:true
      })
      .then(res=>{
        if(res.status==200){
          console.log("res",res);
          setcarts([...res.data.rows]);
        }
      })
      .catch(err=>{
        console.log(err);
      })
      
  },[loaddelete])
  return (
    <Box sx={{ flexGrow: 1, width:"100%" }}>
        <Navbar/>
        <Box sx={{position:"relative",marginTop:"40px"}}>
            {carts.length>0 && <ImageList  cols={y(width)}  sx={{ 
        position:"relative" 
    }}>
        {carts.map((cart) => (
          <Box key={cart.cid} sx={{
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor:"gray",
            width:z(width),
            }}>
        <Link href={`/details/${cart.Product.pid}`}>
            <ImageListItem  >
                <img
                    src={`https://harenastore.onrender.com/images/${cart.Product.letmeSee}`}
                    alt={cart.Product.pname}
                    loading="lazy"
                    style={{
                      backgroundColor:"gray",
                      height:"200px",
                  }}
                />
        </ImageListItem>
        </Link>
        <p style={{backgroundColor:"white",
          maxHeight :"110px",
          width:z(width),
          overflow: "hidden",
          textOverflow:"..."
            }}>{cart.Product.pname}
            </p>
            <p style={{color:"green"}}>{cart.Product.price+"Birr"}</p>
        <Stack direction={"row"} gap={2}>
          <Button color='error' sx={{
            height:"30px",
            color:"white"
          }} variant="contained" startIcon={<Delete />}
          onClick={()=>{ handleDeleteCart(cart.cid)
          }}
          >
          Delete
          </Button>
          <Button sx={{
            height:"30px"
          }} variant="contained" startIcon={<ShoppingBasketIcon />}
          onClick={()=>{ handleOrder(cart.Product.pid)
          }}
          >
          Buy!
          </Button>
        </Stack>
        
        </Box>
      ))}
    </ImageList>}
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
            </Box>
    </Box>
  );
}


