import Navbar from './Navbar';
import React ,{useEffect,useState} from 'react';
import { useNavigate,useParams,useNavigation} from "react-router-dom";
import { ImageList,ImageListItem,Box,Typography,Link,Button} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import { Stack } from '@mui/system';
import axios from 'axios';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Pagination from '@mui/material/Pagination';
import {CircularProgress} from '@mui/material';
let length=3;
  var width = window.innerWidth;
  const y= (x)=>{
    if(x<600) return 2;
    else if (x<1000) return 3;
    else  return 5;
  }
const z= (x)=>{
  if(x<650) return "175px";
  else  return "280px";
}
const CompPro = () => {
    const nav=useNavigate();
    const [page, setPage] = React.useState(1);
    const [loading,setloading]=useState(true);
    const [nopage,setnopage]=useState(1);
    const [itemData,setItemData]=useState([]);
    const api=axios.create({
      baseURL:"https://harenastore.onrender.com/company"
    })
    const api1=axios.create({
      baseURL:"https://harenastore.onrender.com/custom"
    })
    const handleaddCart=(itemid)=>{
        console.log("The item id is  ",itemid);
          api.post('/addcart',{
            withCredentials:true
          },
          )
          .then(res=>{
    
          }).catch(err=>{
            if(err.response.status==404){
              nav('/')
            }
            else{
              console.log(err);
            }
          })
      }
    const handleChange = (event, value) => {
      setPage(value);
    };
    let items=[];
    const searchquery=useParams();
    let searchitem=searchquery.searchitem;
    useEffect(()=>{
        api.get(`/?cpname=${searchitem}&page=${page}`,{
            withCredentials:true
          },
          )
          .then(res=>{
            if(res.status===200){
              let bd=res.data;
              items=bd;
              setnopage(bd.count+1);
              setItemData([...bd.rows]);
              // setfind(true);
              console.log("items",itemData)
            }
          }).catch(err=>{
            console.log(err);
            
          });
          setloading(false);

    },[page])
    console.log("search",searchquery);
    
        return ( 
        <Box >
        <Navbar/>
        <Box flex={6}>
        <Box sx={{
                position:"relative",
                marginTop:"50px",
               
            }}>
      
      { itemData.length>0 && <ImageList  gap={2} cols={y(width)}  sx={{ 
        position:"relative", 
        marginLeft:"50px"

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
    </ImageList>},
    {
      
      (itemData.length===0 && !loading) && <div> Our beloved customers, the product we have for know is this please keep in touch we are adding other products ,
        please  enjoy  other products !</div>
    }
    {
      loading && <CircularProgress/>
    }
    </Box>
    <div style={{
        position:"relative",
        marginTop:"10px",
        backgroundColor:"yellow",
      }}> <Pagination count={nopage} color="primary" page={page} onChange={handleChange} sx={{position:"relative" }}/>
      </div>
        </Box>
        </Box>
    );
}
// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     title: 'Breakfast',
//     author: '@bkristastucchio',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//     title: 'Burger',
//     author: '@rollelflex_graphy726',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//     title: 'Camera',
//     author: '@helloimnik',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     title: 'Coffee',
//     author: '@nolanissac',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//     title: 'Hats',
//     author: '@hjrc33',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//     title: 'Honey',
//     author: '@arwinneil',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     title: 'Basketball',
//     author: '@tjdragotta',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//     title: 'Fern',
//     author: '@katie_wasserman',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//     title: 'Mushrooms',
//     author: '@silverdalex',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     title: 'Tomato basil',
//     author: '@shelleypauls',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//     title: 'Sea star',
//     author: '@peterlaster',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     title: 'Bike',
//     author: '@southside_customs',
//   },
// ];
export default CompPro;