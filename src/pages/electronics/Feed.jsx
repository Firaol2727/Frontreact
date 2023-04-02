import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, List,Button } from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import { Stack } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import {Link,Icon} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
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
export default function Feed({broadcat}) {
  const [itemData,setItemData]=useState([]);
  const nav=useNavigate();
  const [nopage,setnopage]=useState(1);
  let items=[];
  const [open, setOpen] = useState(false);
  const handleClose = () => {
  setOpen(false);
  };
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  let [products,setProducts]=useState([]);
  const api=axios.create({
    baseURL:"https://harenastore.onrender.com/bcat"
  })
  const api1=axios.create({
    baseURL:"https://harenastore.onrender.com/custom"
  });
  const handleaddCart=(itemid)=>{
    console.log("The item id is  ",itemid);
      api1.post('/addcart',{pid:itemid},
      {
        withCredentials:true
      },
      )
      .then(res=>{
        if(res.status==200){
          setOpen(true);
                }
      }).catch(err=>{
          setOpen(true);
        if(err.response.status==403){
          nav('/')
          console.log(err)
        }
        else{
          console.log(err);
        }
      })
  }
  
  useEffect(()=>{
    console.log("the subcategory in feed 2 is ",broadcat);
    let x=(page-1)*4;
    api.get(`/?bname=${broadcat}&page=${page}`)
    .then(async res=>{
      console.log("res",res);
      if(res.status===200){
        let bd=res.data;
        items=bd;
        setnopage(bd.count+1);
        setItemData([...bd.data]);
        // setfind(true);
        console.log("product",products)
        console.log("items",items)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },[page])
  return (
    <Box flex={6} 
   >
      <Box sx={{
      position:"relative",
      marginTop:"50px",
  }}>
    
      {itemData.length>0 && <ImageList cols={y(width)}  sx={{ 
        position:"relative", 
    }}>
        {itemData.map((item) => (
          <Box key={item.pid} sx={{
            borderColor:"red",
            borderWidth:"1px",
            width:z(width),
            }}>
        <Link href={`/details/${item.pid}`}>
            <ImageListItem  >
                <img
                    src={`https://harenastore.onrender.com/images/${item.letmeSee}`}
                    alt={item.pname}
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
            }}>{item.pname}
            </p>
        <Stack direction={"row"} gap={2}>
          <p style={{color:"green"}}>{item.price}</p>
          <p style={{color:"red"}}> <del>{item.marketprice}</del></p>
          <Button sx={{
            height:"30px"
          }} variant="contained" startIcon={<ShoppingCart />}
          onClick={()=>{
            handleaddCart(item.pid)
          }}
          >
          Add
          </Button>
        </Stack>
        
        </Box>
      ))}
    </ImageList>}
    {
      itemData.length===0 && <div> Our beloved customers, the product we have for know is this please keep in touch we are adding other products ,
        please  enjoy  other products !</div>
    }
     <div style={{
        position:"relative",
        marginTop:"10px",
        backgroundColor:"yellow",
      }}> <Pagination count={nopage} color="primary" page={page} onChange={handleChange} sx={{position:"relative" }}/>
      </div>
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
            Product has been added, to your cart!, hit the buy button to finish the order
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

