//material ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { blue, green} from '@mui/material/colors';

//react react-router-dom
import React from 'react';
import { Outlet } from 'react-router-dom';

//local
import Image from './images/meteor.jpg';
import BackgroundImage from './images/sky.jpg';


const theme = createTheme({
	palette: {
		primary: blue,
		secondary: green
	  },
	typography: {
		fontFamily: "'Saira Condensed', sans-serif",
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
	},
});


export default function JoinLayout() {

	return (
		<ThemeProvider theme={theme}>
		<Grid container sx={{
			height: '100vh', 
			width: '100vw', 
			backgroundImage: `url(${BackgroundImage})`,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}}>
			<Box 
				sx={{
					display: 'flex',
					margin: 'auto',
					width: '50%',
					height: '60%'
				}}
			>
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: `url(${Image})`,
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						height:'100%',
					}}
				>
					<Typography variant="h3" 
						sx={{color:'white', 
							textAlign:'center', 
							fontWeight: 'bold', 
							mt:"15%", 
							[theme.breakpoints.down('md')]:{fontSize:20},
							[theme.breakpoints.down('sm')]:{fontSize:0},
						}}>
						Join 
						<br/>the world 
						<br/>of 
						<br/>Meteors
						<br/>Communicate 
						<br/>with others
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8} md={5}>
					<Outlet />
				</Grid>
			</Box>
		</Grid>
		</ThemeProvider>
	);
}