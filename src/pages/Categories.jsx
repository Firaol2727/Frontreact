import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Link, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
const animalspets = require('../assets/images/animalspets.jpg');
const artgallery = require('../assets/images/Art-Galleries-in-Hyderabad.jpg');
const babieskids = require('../assets/images/babieskids.jpg');
const carbodypart = require('../assets/images/Car-Body-Parts.jpg');
const construction = require('../assets/images/construction.jpeg');
const electronics = require('../assets/images/electronics.png');
const equipment = require('../assets/images/equipmenttools.jpg');
const gifts = require('../assets/images/gifts.jpeg');
const homegarden = require('../assets/images/homegarden.jpg');
const musical2 = require('../assets/images/musical2.jpg');
const muslim = require('../assets/images/muslim shop.jpg');
const phonetablet = require('../assets/images/phonetablets.jpeg');
const religeous = require('../assets/images/religeous.jpg');
const sportexercise = require('../assets/images/sportexercise.jpg');
const fashion = require('../assets/images/fashion.jpg');
const healthbeauty = require('../assets/images/health-beauty.png');
const itemData = [    
    {
      img: carbodypart,
      title: ' Vehicle Accessories',
      link:"vehicleaccessories",
    },
    {
      img: phonetablet,
      title: 'Phone& Tablets',
      link:"phonetablets",
    },
    {
      img: electronics,
      title: 'Electronics',
      link:"electronics",
    },
    {
      img: homegarden,
      title: 'Home,Office & Garden',
      link:"homegarden",
    },
    {
      img: healthbeauty,
      title: 'Health & Beuty',
      link:"healthbeauty",
    },
    {
      img: fashion,
      title: 'Fashion',
      link:"fashion",
    },
    {
      img: sportexercise,
      title: 'Sport & Exercise Equipment',
      link:"sportequipment",
    },
    {
      img: artgallery,
      title: 'Arts & Crafts',
      link:"artcrafts",
    },
    {
      img: musical2,
      title: 'Musical Instrument',
      link:"musicalinstrument",
    },
    {
      img: babieskids,
      title: 'Babies & Kidss',
      link:"babieskids",
    },
    {
      img: animalspets,
      title: 'Animals & Pets',
      link:"animalpets",
    },
    {
      img: equipment,
      title: 'Equipment & Tools',
      link:"equipmenttools",
    },
    {
      img: gifts,
      title: 'Gifts',
      link:"gifts",
    },
    {
      img: religeous,
      title: 'Christean Religion Products',
      link:"christeanproducts",
    },
    {
      img: muslim,
      title: 'Islamic Products',
      link:"islamicproducts",
    },
    {
      img: construction,
      title: 'Repair & Construction',
      link:"construction",
    },
  ];
const api=axios.create({
  baseURL:"https://harenastore.onrender.com/custom"
})
export default function Categories() {
  const y= (x)=>{
    if(x<650) return 2;
    else  return 4;
  }
  const z= (x)=>{
    if(x<650) return "170px";
    else  return "300px";
  }
  let [a,seta]=useState('https://images.unsplash.com/photo-1589118949245-7d38baf380d6') ; 
  const advertImages=[
    'https://plus.unsplash.com/premium_photo-1666497635505-fbe5ef5062f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuB3mVuiMsePGVbzT3CkrlGnOgSj0tkvKszA&usqp=CAU',

  ]
  let length=3;
  var width = window.innerWidth;
  let [index,setIndex]=useState(0);
    useEffect(()=>{
      const interval=setInterval(() => {
        if (index==3) {
          index=0;
          seta(advertImages[index])
        }
        else{
          seta(advertImages[index]);
        }
        setIndex(index+1);
      }, 15000);
      return ()=>clearInterval(interval);
    },[a])
    const api1=axios.create({
      baseURL:"https://harenastore.onrender.com/custom"
    });
    useEffect(()=>{
      api1.get('/categories')
      .then(res=>{
          console.log(res)
      })
      .catch(err=>{
        console.log(err);
      })
    },[])
    return (
      <div>
    <Box sx={{
        position :"absolute",
        height:"300px",
        width:"100%",
        backgroundImage:`url(${a})`,
        backgroundRepeat:"repeat-x"
    }}>
    </Box>
    <ImageList gap={6} sx={{ position:"absolute", 
    top:"350px" , zIndex:"2", width:"90%",
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
        <Link href={`/custom/${item.link}`}  style={{
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
        color:"white",
        backgroundColor:"#282A3A"
      }}> 
        <center><b>Contact Us</b> </center>
        <p>Email - fraolgetachew2772@gmail.com</p> 
        <p>phone - +251966003807 /+251976087942</p>
        <p>facebook - http://facebook.com</p>
      </Box>
      <Box sx={{
        position:"relative",
        height:"200px",
        backgroundColor:"green"
      }}>
      </Box>
      
    </ImageList>

    </div>
    );
        }


