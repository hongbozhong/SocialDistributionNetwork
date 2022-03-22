import { Outlet } from 'react-router-dom';
import PrimarySearchAppBar from './components/appbar'
import LeftFixedDrawer from './components/drawer'


const drawerWidth = 240;
export default function Layout() {
    return (
        <>
            <PrimarySearchAppBar drawerWidth={drawerWidth}/>
            <LeftFixedDrawer drawerWidth={drawerWidth}/>
            <div sx = {{
                marginTop: drawerWidth
            }}>
                <Outlet />
            </div>
        </>
    )
}