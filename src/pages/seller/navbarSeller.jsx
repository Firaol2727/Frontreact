import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const drawerWidth = 240;
const navItems = ['MyProduct','AddProduct', 'Myprofile'];
function NavbarSeller(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const nav=useNavigate();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const api=axios.create({
        baseURL:"https://harenastore.onrender.com/sel"
      });
    const handleLogout=()=>{
        api.get('/logout').
        then(res=>{
            localStorage.removeItem('jwt')
            nav('/sellerLogin')
        }).catch(err=>{
            console.log(err)
        })
    }
const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{
            my: 2 ,
            backgroundColor:"blue",
            color:"white"
        }}>
            Harena.com
        </Typography>
        <Divider />
        <List>
            <Link href="/selhome" underline="none" >
            <ListItem  disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                   <ListItemText primary="AddProduct" />
                </ListItemButton>
            </ListItem>
            </Link>
            <hr/>
            <Link href="/myproduct" underline="none" >
            <ListItem  disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                   <ListItemText primary="MyProduct" />
                </ListItemButton>
            </ListItem>
            </Link>
            <hr/>
            <Link href="/myprofile" underline="none" >
            <ListItem  disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                   <ListItemText primary="Myprofile" />
                </ListItemButton>
            </ListItem>
            </Link>
            <Divider/>
            <ListItem  disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogout}>
                   <ListItemText primary="Logout" color="secondary" />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
);
const container = window !== undefined ? () => window().document.body : undefined;
return (
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav">
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
            </IconButton>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {  sm: 'block' } }} // xs: 'none',
        >
            Harena.com
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link href="/selhome" underline="none" ><Button  sx={{ color: '#fff' }}>AddProduct</Button></Link>

            <Link href="/myproduct" underline="none" ><Button  sx={{ color: '#fff' }}>MyProduct</Button></Link>

            <Link href="/myprofile" underline="none" ><Button  sx={{ color: '#fff' }}>Myprofile</Button></Link>
            <Button onClick={handleLogout} sx={{ color: '#fff' }}>Logout</Button>
        </Box>
        </Toolbar>
    </AppBar>
    <Box component="nav">
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
    </Box>
    </Box>
  );
}


export default NavbarSeller;