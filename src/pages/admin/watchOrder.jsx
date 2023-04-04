import React,{useState,useEffect,useMemo} from 'react';
import {useNavigate} from "react-router-dom";
import NavbarAdmin from './adminNav';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { CircularProgress, Link, Typography } from '@mui/material';
const WatchOrder = () => {
  let item=[];
  let [rows,setrows]=useState([]);
  const api=axios.create({
    baseURL:"https://harenastore.onrender.com/special",
  });
  const nav=useNavigate();
  useEffect(()=>{
    api.get('/watchorder',
    {
      // withCredentials:true,
      'Access-Control-Allow-Credentials':true
    }
  ).then(res=>{
    let data=res.data;
    item=data;
    let elements=[];
    for (let index = 0; index < data.length; index++) {
      if(data[index].Product){
        elements.push({
        "oid":data[index].oid,
      "cname":data[index].Customer.fname+data[index].Customer.lname,
      "cphone":data[index].Customer.phone,
      "clocation":data[index].Customer.cloaction,
      "city": data[index].Customer.city,
      "pname":data[index].Product.pname,
      "pid":data[index].Product.pid,
      "amount":data[index].amount,
      "price":data[index].Product.price,
      "company":data[index].Seller.companyName,
      "manager":data[index].Seller.managerFname+data[index].Seller.manageLname,
      "sphone":data[index].Seller.phoneNo,
      "slocation":data[index].Seller.slocation
      })
      
      }
      
    }
    console.log("elements",elements);
    if(res.status===200){

      setrows([...elements])
    }
       // setErrmsg("Successfull login")
    console.log(res);
  }).catch(err=>{
    if (err.response) {
      nav('/adlogin') 
      console.log(err);
  } else if (err.request) {
      // The client never received a response, and the request was never left
      nav('/adlogin') 
      console.log(err);
  } else {
      // Anything else
      // nav('/adlogin') 
      console.log(err);
  }
  });

  },[])
  
    return ( 
        <>
        <NavbarAdmin/>
        {
          rows&&<TableContainer component={Paper} sx={{
            position:"absolute" ,
            top:"100px"
    }}>
      <Typography variant="h3"> ORDERS</Typography>
      <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">OrderId</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell align="right">Cphone</TableCell>
            <TableCell align="right">Clocation</TableCell>
            <TableCell align="right">productname</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">price</TableCell>
            <TableCell align="right">Company</TableCell>
            <TableCell align="right">Manager</TableCell>
            <TableCell align="right">Sphone</TableCell>
            <TableCell align="right">SLocation</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.oid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> <Link href={`/editorder/${row.oid}`} underline="none">{row.oid}</Link> </TableCell>
              <TableCell component="th" scope="row">{row.cname}</TableCell>
              <TableCell align="right">{row.cphone}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right"><Link href={`/details/${row.pid}`} underline="none">{row.pname}</Link></TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right">{row.sphone}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <TableCell align="right">{row.slocation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
       },
  { !rows&& < CircularProgress sx={{
    position:"absolute",
    top:"40%",
    left:"20%"}} />}
        </>
     );
}
 
export default WatchOrder;