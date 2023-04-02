import React ,{useEffect,useState}from "react";
import {Link,Icon} from '@mui/material';
import { Box} from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
const api=axios.create({
  baseURL:"http://localhost:5000"
})
const Sidebar=({broadcat})=>{
  const [sub,setsub]=useState([]);
    useEffect(()=>{
      console.log("running the use Effect")
      api.get(`/category/${broadcat}`,(req,res)=>{
      }).then(res=>{
        // console.log(res);
        let response=res.data;
        setsub([...response.Categories])
        // console.log("sub",sub);
      }).catch(err=>{
        console.log(err);
      })
    },[])
    return(
        <Box bgcolor= 'background.paper'  
            flex={1} p={1} 
            sx={{
              display:{xs:"none",sm:"block"},
              position:"static"
            }} 
              >
        <Box bgcolor= 'white'> 
        <List   bgcolor= 'white'
          aria-label="contacts" sx={{marginTop:"10px"
          }}
    >
      {
        sub.map(subcategory=>(
          <Link  key ={subcategory.cid} href={`/custom/${broadcat}/${subcategory.cname}`} underline="none" sx={{color:"black"}} >
            <ListItemButton>
              <ListItem disablePadding >
                <ListItemText primary={subcategory.cname}  />
              </ListItem>
            </ListItemButton>
          </Link>
        ))
      }
    </List>
        </Box>
        </Box>
    );
}
export default Sidebar;