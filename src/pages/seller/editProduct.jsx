import React,{useEffect, useState} from 'react';
import axios from "axios";
import{  useParams,useNavigate} from 'react-router-dom';
import NavbarSeller from './navbarSeller';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import {Delete, ErrorSharp} from '@mui/icons-material';
import { TextField ,Box, Typography, CircularProgress, Button} from '@mui/material';

const EditProduct = ({pid}) => {
    let productDetail;
    const y= (x)=>{
      if(x<600) return 2;
      else  return 4;
    }
    const z= (x)=>{
      if(x<600) return "100%";
      else  return "60%";
    }
    const id=useParams();
    const nav=useNavigate();
    var width = window.innerWidth;
    const [itemData,setItemdata]=useState([]);
    const[products,setproducts]=useState();
    const [pname,setPname]=useState('');
    const [price,setPrice]=useState('');
    const [message,setMessage]=useState('--');
    const [marketprice,setMarketprice]=useState('');
    const [description,setDescription]=useState('');
    const DeleteSelected=(Imageid)=>{
        let id=Imageid;
        if(id){
          api.delete(`/images`,
          id
          ).then(res=>{
            console.log(res);
            console.log(res.data);
          }).catch(err=>{
            if (err.response) {
              console.log("response error");
              
          } else if (err.request) {
              // The client never received a response, and the request was never left
          
          } else {
              // Anything else
              console.log("something went wrong ");
          }
          });
        }
        
    }
    const[found,setfound]=useState(false);
    const fid=id.pid;
    const ffid=Number(fid);
    console.log(fid);
    const api=axios.create({
      baseURL:"https://harenastore.onrender.com/sel"
    });
    const handleDelete =(id)=>{
      console.log(id)
      api.post('/deleteproduct',{id},{
          withCredentials:true
      })
      .then(res=>{
          if(res.status===200){
              nav('/myproduct')
          }

      })
      .catch(err=>{
          console.log(err)
      }) 
  }
    const handleEdit=(e)=>{
        e.preventDefault();
        setMessage('....loading')
      api.post('/editproduct',{
        pname,price,marketprice,description,
        ffid
      },{   withCredentials:true
        })
      .then(res=>{
          if(res.status===200){
            setMessage('update successfull')
          }
          else{
            setMessage("what is going on")
          }
      }).catch(err=>{
            console.log(err)
            setMessage('something went wrong ')
      })
    }
    useEffect(()=>{
      api.get(`/product/${fid}`,
          {
          withCredentials:true
          }
      )
      .then(res=>{
          let bd=res.data;
          if(res.status===200)
              setproducts(bd);
              setPname(bd.pname)
              setPrice(bd.price)
              setMarketprice(bd.marketprice)
              setDescription(bd.description)
              setItemdata(bd.Pictures)
              setfound(true)
          })
      .catch(err=>{
            if(err.response.status===404){
              console.log(err);
              nav('/sellerLogin')
            }
             if (err.request){
              setMessage("request error ")
            }
            else{
              setMessage("something went wrong")
            }
          console.log(err);
          
          });
  },[])
    
    return ( 
        <>
        {found&&<>
        <NavbarSeller/>
        <ImageList sx={{
          width:z(width)
        }}>
      <ImageListItem key="Subheader" cols={y(width)}>
        <ListSubheader component="div">PHOTOS</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.id} sx={{
          width:"200px"
        }}>
          <img
            src={`https://harenastore.onrender.com/images/${item.id}`}
            // srcSet={`${item.img}`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
        <br/>
        <br/>
        <Box sx={{
          postion:"relative",
          left:"40px",
          border:"1px",
          borderColor:"black"
        }}>
          <form style={{
            marginLeft:"20px"
          }} onSubmit={handleEdit}>
          <h4>{message}</h4>
        <TextField
          id="outlined-required"
          label="ProductName"
          defaultValue={products.pname}
          onChange={(e)=>{
            setPname(e.target.value)
          }}
        />
         <br/>
        <br/>
        <TextField
          type="number"
          id="outlined-required"
          label="market price"
          defaultValue={products.marketprice}
          onChange={(e)=>{
            setMarketprice(e.target.value)
          }}
        />
         <br/>
        <br/>
        <TextField
          required
          id="outlined-required"
          label="sellprice"
          type="number"
          defaultValue={products.price}
          onChange={(e)=>{
            setPrice(e.target.value)
          }} 
        />
        <p>Description</p>
        <textarea value={products.description}
         onChange={(e)=>{
              setDescription(e.target.value)
        }} style={{
          position:"relative",
          marginTop:"5px",
          width:"380px",
          height:"300px"
        }}>
        </textarea>
        <br />
        <b>{message}</b>
        <br />
       
        <button style={{width:"60%",left:"30%", }} type="submit" >Edit</button>
        </form>
        <Button style={{backgroundColor:"red",width:"50%",left:"2%",color:"white",marginTop:"20px"}} onClick={()=>{
          handleDelete(fid)}
        }> Delete</Button>
        </Box>
        </>},
        {
          !found&& <CircularProgress/>
        }
        </>
     );
}
export default EditProduct;