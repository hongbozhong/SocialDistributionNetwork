//mertail ui
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Tooltip from '@mui/material/Tooltip';

//react and react-router-dom
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//local
import BackgroundImage from './images/background.jpg';
import AccountMenu from './components/accountmenu';
import axiosInstance from './axiosinstance';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#000000',
  border: 0,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#000000', 
  border: 0,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    })
);

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open'})(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);


const menuItems = [
    { 
        text: 'Home', 
        icon: <HomeOutlinedIcon color="secondary" />, 
        path: '/' 
    },
    { 
        text: 'New Post', 
        icon: <AddCircleOutlineOutlinedIcon color="secondary" />, 
        path: '/create' 
    },
    { 
        text: 'Inbox', 
        icon: <InboxIcon color="secondary"/>, 
        path: '/inbox' 
    },
];

export default function HomeLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        axiosInstance.post('/logout/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token'),
        }).catch((error) => {
            console.log("logout error", error);
        })
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/join/login');
    }


    return (
        <Box sx={{ display: 'flex'}}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon color='secondary'/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" color='secondary' sx ={{flexGrow: 1}}>
                        Meteors
                    </Typography>
                    <AccountMenu handleLogout={handleLogout}/>
                </Toolbar>
            </AppBar>
            <Drawer 
                variant="permanent" 
                open={open} 
                /*sx ={{'& .MuiDrawer-paper': {bgcolor: '#000000', border: 0}}}*/
                position='fixed'
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon color="secondary"/> : <ChevronLeftIcon color="secondary"/>}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List >
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick = {() => navigate(item.path)}
                    >   
                        <Tooltip title={item.text} arrow placement='right'>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0, color:'#96FF33' }} />                  
                    </ListItemButton>
                ))}
                </List>
            </Drawer>
            
            <Box
                sx={{ 
                    flexGrow: 1, 
                    p: 3, 
                    height: '100vh',
                    backgroundImage: `url(${BackgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'auto',
                }}
            >
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
    }
