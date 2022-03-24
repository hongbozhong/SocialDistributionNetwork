//material ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
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
			<Container sx={{
				  m: 0,
				  position: 'absolute',
				  display: 'flex',
				  top: '50%',
				  transform: 'translateY(-50%)',
				  width: '50%',
				  left: '25%',
			}}>
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
						height:640,
				}}
				>
					<Typography variant="h3" sx={{color:'white', textAlign:'center', fontWeight: 'bold', mt:"15%"}}>
						Join 
					</Typography>
					<Typography variant="h3" sx={{color:'white', textAlign:'center', fontWeight: 'bold'}}>
						the world 
					</Typography>
					<Typography variant="h3" sx={{color:'white', textAlign:'center', fontWeight: 'bold'}}>
						of 
					</Typography>
					<Typography variant="h3" sx={{color:'white', textAlign:'center', fontWeight: 'bold'}}>
						Meteors
					</Typography>
					<Typography variant="h3" sx={{color:'white', textAlign:'center', fontWeight: 'bold'}}>
						Communicate 
					</Typography>
					<Typography variant="h3" sx={{color:'white', textAlign:'center', fontWeight: 'bold'}}>
						with others
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8} md={5}>
					<Outlet />
				</Grid>
			</Container>
		</Grid>
		</ThemeProvider>
	);
}