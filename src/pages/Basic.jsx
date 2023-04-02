import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import {List,Link} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function NestedList({mobileOpen,setMobileOpen}) {
  const [open, setOpen] = React.useState(true);
  const [broadopen, setbroadopen] = React.useState(true);
  const [subopen, setsubopen] = React.useState(false);
  const [categories,setCategories]=useState([]);
  const [subcategories,setsubcategories]=useState([]);
  const [broadcat,setbroadcat]=useState("");
  const handleClick = () => {
    setOpen(!open);
  }; 
  const handleDrawerToggle = () => {
    setsubopen(false);
    setbroadopen(true);
    setMobileOpen(!mobileOpen);
};
  const handlesub=()=>{
    if(subopen){
      setsubopen(false);
      setbroadopen(true)
    }
    else{
      setMobileOpen(false);
    }
  }
  const api= axios.create({
    baseURL:"https://harenastore.onrender.com/custom"
  })
  useEffect(()=>{
  api.get('/categories')
    .then(res=>{
        console.log(res)
        let data=res.data;
        // console.log(data);
        setCategories(data);
        // console.log("categories",categories)
    })
    .catch(err=>{
      console.log(err);
    })
  },[])
  function listsub(item,name) {
    // console.log("item",item);
    setbroadcat(name);
    setbroadopen(false);
    setsubcategories(item);
    setsubopen(true);
  }
  return (
    <>
    {
      mobileOpen && <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
       <ListItemButton onClick={handlesub}>
            <ArrowBackIcon/>
          </ListItemButton>
      {
        broadopen && categories.map((broad)=>(
          <>
          <ListItemButton key={broad.pid}onClick={()=>{
            listsub(broad.Categories,broad.name)
          }}>
            <ListItemText primary={broad.name} />
              <ArrowForwardIosIcon />
          </ListItemButton>
        </>
        ))
      }
      {
        subopen && subcategories.map((sub)=>(
          <>
            <Link key={sub.cid} href={`/custom/${broadcat}/${sub.cname}`} underline="none" sx={{color:"black"}} >
              <ListItemButton >
              <ListItemText primary={sub.cname} />
            </ListItemButton>
            </Link>
        </>
        ))
      }
     </List>
    }
    </>
  );
  }