import Navbar from './Navbar';
import React ,{useEffect,useState} from 'react';
import { useNavigate,useParams,useNavigation} from "react-router-dom";
import { ImageList,ImageListItem,Box,Typography,Link} from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import axios from 'axios';
let length=3;
  var width = window.innerWidth;
const y= (x)=>{
  if(x<650) return 2;
  else  return 4;
}
const z= (x)=>{
  if(x<650) return "170px";
  else  return "300px";
}
const api=axios.create({
  baseURL:"https://harenastore.onrender.com"
})
const Search = () => {
    const searchquery=useParams();
    let searched=searchquery.searchitem;
    console.log("search",searchquery);
    useEffect(()=>{
      api.get(`/search/:${searched}`)
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
        console.log(err);
      })
    },[])
    
        return ( 
        <>
        <Navbar/>
    <ImageList gap={6} sx={{ position:"absolute", 
    top:"100px" , zIndex:"2", width:"90%",
    //  background:"grey",
    left:"5%",
    }}>
        <ImageListItem key="Subheader" cols={y(width)}>
    </ImageListItem>
        {itemData.map((item) => (
          <Box key={item.img} sx={{
            borderColor:"red",
            borderWidth:"1px"
                      }}>
        <Link href="/electronics"  style={{
          
        }} >
            <ImageListItem sx={{width:z(width)}} >
                <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    
                    style={{
                      width:z(width),
                      height:z(width)
                    }}
                />
        </ImageListItem>
        </Link>
        <Typography  sx={{backgroundColor:"white",
            height:"50px",
            width:z(width)
            }}>{item.title}</Typography>
        </Box>

      ))}
      <Box sx={{
        position:"relative",
        height:"200px",
      }}> 
      </Box>
      <Box sx={{
        position:"relative",
        height:"200px",
      }}>
      </Box>
      
    </ImageList>
        </>
     );
}
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
export default Search;