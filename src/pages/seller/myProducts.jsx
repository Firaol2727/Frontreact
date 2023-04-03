
import React,{useEffect,useState}from "react"; 
import {useNavigate} from 'react-router-dom';
import NavbarSeller from './navbarSeller';
import { styled } from '@mui/material/styles';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import { Stack,Box, Link } from "@mui/material";
import { ImageList,ImageListItem,Typography,} from '@mui/material';
import axios from 'axios';

const MyProduct = () => {
    const nav=useNavigate();
    const [dense, setDense] = React.useState(false);
    const [message,setmessage]=useState('');
    const [edited,setedited]=useState(false);
    let [products,setProducts]=useState([]);
    const [pictures,setpictures]=useState();
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/sel"
      });
    var width = window.innerWidth;
    const y= (x)=>{
    if(x<650) return 2;
    else  return 4;
    }
    const z= (x)=>{
    if(x<650) return "170px";
    else  return "300px";
    }
    // const handleDelete =(id)=>{
    //     console.log(id)
    //     setmessage('......deleting')
    //     api.post('/deleteproduct',{id},{
    //         withCredentials:true
    //     })
    //     .then(res=>{
    //         if(res.status===200){
    //             setedited(true);
    //             setmessage("")
    //         }

    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     }) 
    // }

    useEffect(()=>{
        console.log("useeffect processing ")
        api.get('/myproductt',
            {
            withCredentials:true
            }
        )
        .then(res=>{
            let bd=res.data;
            // console.log(bd)
            if(res.status===200)
                setProducts(bd);
                // setpictures(bd[0].Pictures[0])
            })
        .catch(err=>{
            if (err.response.status===404) {
                nav('/sellerLogin') 
            }
            else if (err.response) {
                setmessage("some thing went wrong")
            } else if (err.request) {
                // The client never received a response, and the request was never left
                console.log(err);
            } else {
                // Anything else
                // nav('/adlogin') 
                console.log(err);
            }
            });
    },[edited])
    return ( 
        <>
        <NavbarSeller/>
        {products.length>0 &&<div>
            <ImageList gap={6} sx={{ position:"absolute", 
    top:"80px" , zIndex:"2", width:"90%",
    //  background:"grey",
    left:"5%",
    }}>
        <ImageListItem key="Subheader" cols={y(width)}>
        <h3>Products</h3>
    </ImageListItem>
                {
                    products&& products.map((product) =>
        <Box key={product.pid} sx={{
            borderColor:"red",
            borderWidth:"1px"
                    }}>
        <Link href={`/editproduct/${product.pid}`}  style={{
        }} >
            <ImageListItem sx={{width:z(width)}} >
                <img
                    src={`https://harenastore.onrender.com/images/${product.letmeSee}`}
                    alt={product.pname}
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
            }}>{ product.pname}<br></br> {product.price+" Birr"}</Typography>
        </Box>
)
}
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
                {
                    !products &&
                        <h4>No products yet please add yor products </h4>
                    
                }
            
            </ImageList>
        </div>}
        {
            products.length<=0 &&<div>
                <b>No products yet !</b>
            </div>
        }
        </>
     );
}
export default MyProduct;