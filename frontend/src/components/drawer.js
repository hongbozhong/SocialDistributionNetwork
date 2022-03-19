import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = [
    { 
      text: 'My Posts', 
      icon: <SubjectOutlinedIcon  color="secondary" />, 
      path: '/',
    },
    { 
      text: 'Create Post', 
      icon: <AddCircleOutlineOutlinedIcon color="secondary" />, 
      path: '/create',
    },
];

export default function LeftFixedDrawer(drawerwidth) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Drawer
                variant="permanent"
                anchor="left"
                xs = {{
                    width: {drawerwidth},
                }}
                >


                <List>
                {menuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.text} 
                        onClick={() => navigate(item.path)}
                        xs = {location.pathname === item.path ? {
                            background: '#f4f4f4'
                        } :
                        null}
                    >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
        </>
    )
}