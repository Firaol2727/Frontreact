import React,{useEffect,useState} from 'react';
import useFetch from './FechData';
import { useNavigate,useParams } from 'react-router-dom';
import Sidebar from './electronics/Sidebar';
import Feed from './electronics/Feed';
import {Stack,Box} from '@mui/system';
import Navbar from './Navbar';
import {ListItem,List} from '@mui/material';
const Products = () => {
   const bigcategory=useParams('cname');
   const broadcat=bigcategory.cname;
   useEffect(()=>{
      console.log("broadcat",broadcat);
   },[])
   return ( 
      <>
      <Navbar />
      <div>
      <Stack direction="row"  justifyContent="space-between" spacing={0.5}>
         <Sidebar broadcat={broadcat} />
         <Feed broadcat={broadcat} />
      </Stack>
      </div>
      </>
     );
}
export default Products;