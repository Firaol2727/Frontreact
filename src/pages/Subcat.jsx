import React,{useEffect,useState} from 'react';
import useFetch from './FechData';
import { useNavigate,useParams } from 'react-router-dom';
import Sidebar from './electronics/Sidebar';
import Feed2 from './electronics/Feed2';
import {Stack,Box} from '@mui/system';
import Navbar from './Navbar';
import {ListItem,List} from '@mui/material';
const Subcat = () => {
   const bigcategory=useParams();
   const broadcat=bigcategory.cname;
   const subcat=bigcategory.subname;
//    useEffect(()=>{
      
//    },[])
   return ( 
      <>
      <Navbar />
      <div>
      <Stack direction="row"  justifyContent="space-between" spacing={0.5}>
         <Sidebar broadcat={broadcat} />
         <Feed2 subcat={subcat} />
      </Stack>
      </div>
      </>
     );
}
export default Subcat;