import React,{ useState,useEffect }  from 'react';
import NavbarSeller from './navbarSeller';
import {MenuItem,Box,Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const nav=useNavigate();
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState([]);
  const [broadcategory,setBroadcategory]=useState([]);
  let fileArray = [];
  const uploadMultipleFiles=(e)=>{
    let fileObj = [];
    fileObj.push(e.target.files)
    console.log(fileObj)
    console.log(fileArray)
    for (let i = 0; i < fileObj[0].length; i++) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setPreview(fileArray)
    console.log(fileArray)
}
  const api=axios.create({
    baseURL:"https://harenastore.onrender.com/sel"
  });
    useEffect(()=>{
      api.get('/subcategories').then(res=>{
        let bd=res.data;
        if(res.status===200)
            // console.log(bd);
            setBroadcategory(bd);
        }).catch(err=>{
        if (err.response) {
            console.log(err);
            nav('/sellerLogin') 
            
        } else if (err.request) {
            // The client never received a response, and the request was never left
            console.log(err);
            
        } else {
            // Anything else
            // nav('/adlogin') 
            console.log(err);
        }
        });
    },[])
    return ( 
    <div>
        <NavbarSeller/>
        <Box 
        sx={{
            position:"absolute",
            left:"10%",
            top:"10%",
            width:"80%",
            backgroundColor:"white",
        }}>
        <Typography variant="h4">AddProduct</Typography>
        <form action="https://harenastore.onrender.com/sel/upload" method='POST' encType ="multipart/form-data" >
          <br/><br/>
        <TextField  label="productName" id="fullWidth"  type="text" required name='pname'/>
        <br/><br/>
        <TextField  label="Market price" id="fullWidth"  type="number" required name='marketprice'/>
        <br/><br/>
        <TextField  label="Sell Price" id="fullWidth" type="number" required name='price'/>
        <br/><br/>
      <select name="category" id="cars" style={{
        width:"200px",
        height:"50px"}}>
        {
          broadcategory.map((option) =>
          <option key={option.cid} value={option.cid}>{option.cname}</option>
          )
        }
        
      </select>
        <br/>
        <br/>
        <textarea name="description" id="did" cols="30" rows="10" placeholder='add description'></textarea>
        <h4>Add Pictures</h4>
        <input type="file"  id='inputPic' accept='image/*' style={{
          backgroundColor:"violet",
          color:"white",
          alignItems:"center",
          width:"300px"
        }} 
        onChange={uploadMultipleFiles}  multiple name="image"  /> 
        <br></br>
        <div className="form-group multi-preview">
                    {(preview || []).map(url => (
                        <img key={url} src={url} alt="..." />
                    ))}
                </div>

        <button type="submit" >POST</button>
        <br/>
        <br/>
        </form>
        </Box>
    </div>
    );
}

export default AddProduct;