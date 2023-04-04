import React,{useState,useEffect,useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAdmin from './adminNav';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from '@mui/material';
import axios from 'axios'
import { CircularProgress, Typography } from '@mui/material';

const Sellers = () => {
  const api=axios.create(
    {
      baseURL:"https://harenastore.onrender.com/special"
    }
  )
  const [change,setchange]=useState(false);
  const handledeleteSeller=(sid)=>{
    console.log("seller sid",sid);
    api.post('/deleteseller',{sid:sid},{
      withCredentials:true
    }).then(res=>{
      if(res.status===200){
        setchange(!change);
      }
    }).catch(err=>{
      console.log(err);
    })

  }
  const [merchants,setmerchants]=useState([]);
  const nav=useNavigate();
    useEffect(()=>{
      console.log("running the use Effect")
        api.get('/sellers',{
          // withCredentials:true,
          'Access-Control-Allow-Credentials':true
        }).then(res=>{
            let data=res.data;
            console.log(data)
            setmerchants(data);
        }).catch(err=>{
            if(err.response.status==404){
                nav('/adlogin')
            }
            else if (err.response){
              console.log("something went wrong")
            }
            else{
              console.log("something went wrong")
            }
        })
    },[change])
    return ( 
        <>
        <NavbarAdmin/>
        <TableContainer component={Paper} sx={{
            position:"absolute" ,
            top:"100px"
    }}>
      <Typography variant="h3"> OUR BELOVED SELLERS </Typography>
      <Table sx={{ minWidth: 900 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">SellerId</TableCell>
            <TableCell align="right">Manger Name</TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            <TableCell align="right">Region</TableCell>
            <TableCell align="right">Stream</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Total Products</TableCell>
            <TableCell align="right">Total Sells</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow
              key={merchant.sid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {merchant.sid}
              </TableCell>
              <TableCell component="th" scope="row">
                {merchant.managerFname+" "+merchant.manageLname}
              </TableCell>
              <TableCell align="right">{merchant.companyName}</TableCell>
              <TableCell align="right">{merchant.phoneNo}</TableCell>
              <TableCell align="right">{merchant.region}</TableCell>
              <TableCell align="right">{merchant.Stream}</TableCell>
              <TableCell align="right">{merchant.city} </TableCell>
              <TableCell align="right">{merchant.Stream}</TableCell>
              <TableCell align="right">{merchant.Stream}</TableCell>
              <TableCell align="right"><Button variant="contained" color="secondary" 
                  onClick={()=>{
                    handledeleteSeller(merchant.sid)
                  }}
              >Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
     );
}
 
export default Sellers;