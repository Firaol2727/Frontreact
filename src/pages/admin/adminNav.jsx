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

const drawerWidth = 240;
const navItems = ['MyProduct','AddProduct', 'Myprofile'];

function NavbarAdmin(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
            Harena.com
        </Typography>
        <Divider />
        <List>
            <Link href="http://localhost:3000/watchorder" underline="none">
            <ListItem disablePadding sx={{
                border:"1px black"
            }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"watchOrder"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/totalsell" underline="none">
            <ListItem disablePadding sx={{
                border:"1px black"
            }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"Total Sell"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/addseller" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"addSeller"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/sellers" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"sellers"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/myprofilea" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"Myprofile"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />
            
            <Link href="http://localhost:3000/addseller" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"AddSeller"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />
            
            <Link href="http://localhost:3000/addcategory" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"AddCategory"} />
                </ListItemButton>
            </ListItem>
            </Link>
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
            <Link href="http://localhost:3000/watchorder" underline="none" ><Button  sx={{ color: '#fff' }}>Watch Order</Button></Link>

            <Link href="http://localhost:3000/addseller" underline="none" ><Button  sx={{ color: '#fff' }}>Add Seller</Button></Link>

            <Link href="http://localhost:3000/sellers" underline="none" ><Button  sx={{ color: '#fff' }}>sellers</Button></Link>
            <Link href="http://localhost:3000/myprofilea" underline="none" ><Button  sx={{ color: '#fff' }}>profile</Button></Link>
            <Link href="http://localhost:3000/addcategory" underline="none" ><Button  sx={{ color: '#fff' }}>Add Category</Button></Link>
            <Link href="http://localhost:3000/totalsell" underline="none"><Button  sx={{ color: '#fff' }}>Total Sell</Button></Link>
            
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

export default NavbarAdmin;