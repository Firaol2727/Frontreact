import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack } from '@mui/material'; 
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge'; 
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {Home, HomeMaxOutlined, ShoppingCart} from '@mui/icons-material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import {Link} from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import NestedList from './Basic';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 3,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `${theme.spacing(3)}`,
    transition: theme.transitions.create('width'),
    color:"black",
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
export default function PrimarySearchAppBar(props){
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const  nav=useNavigate();
  const [cartno,setcartno]=useState(0);
  const { window } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link href='/profile' underline='none' color="black" >Profile</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link  href="/" underline='none' color="black" >Log out</Link></MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <EmojiEmotions />
          </IconButton>
        
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const api1=axios.create({
    baseURL:"https://harenastore.onrender.com/custom"
  });
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [searchitem,setsearchitem]=useState('');
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{
            my: 2 ,
        }}>
            Harena.com
        </Typography>
        <Divider />
        <NestedList mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </Box>
);
  useEffect(()=>{
    api1.get("/mycart",
    {
      withCredentials:true
    })
    .then(res=>{
        console.log(res.data);
        let no=res.data.count;
        setcartno(no);
    }).catch(err=>{ 
      console.log(err);
    })

  },[])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
      //position="static"
        sx={{backgroundColor:"#282A3A", width:"100%"}}
      >
        <Toolbar className="titile_logo">
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            HARENA.com
          </Typography>
          <Stack direction={"row"} sx={{
            backgroundColor:"white",
            marginLeft:"6px",
          }}>
            <StyledInputBase placeholder="Search…" 
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>setsearchitem(e.target.value)}
            />
          <IconButton onClick={()=>{
            nav(`/search/${searchitem}`)
          }}>
            <SearchIcon color="white"/>
          </IconButton>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex"}}>
            <IconButton sx={{
              display: { xs: 'none', md: 'flex' }
            }} size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>{
              nav(`/home`)
            }}>
                <Home />
            </IconButton>
            <IconButton 
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >

              <Link href="/cart" underline="none" sx={{color:"white"}}>
              <Badge badgeContent={cartno} color="error">
                <ShoppingCart />
              </Badge>
              </Link>
            </IconButton>
            <IconButton  onClick={handleProfileMenuOpen}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
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
