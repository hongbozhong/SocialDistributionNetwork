import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import { Container } from '@mui/material';

import Image from '../images/meteor.jpg';
import BackgroundImage from '../images/sky.jpg';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../components/axios';

function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" sx={{color: 'white', mt:5}}>
		  {'Copyright © Meteor '}
		  {new Date().getFullYear()}
		  {'.'}
	  </Typography>
	);
  }

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
	  color: '#96FF33',
	},
	'& .MuiOutlinedInput-root': {
		'&.Mui-focused fieldset': {
		  	borderColor: '#3CFF33',
		},
		'&:hover fieldset': {
			borderColor: '#3CFF33',
		},
		'& fieldset': {
			borderColor: '#0E7D3C',
		},
		'& label.Mui-focused': {
			color: '#3CFF33',
		},
	}
});

export default function SignInSide() {
  const navigate = useNavigate();
  const [formdata, updateformdata] = useState();

  const handleChange = (e) => {
    updateformdata({
      	...formdata,
      	[e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

	if (formdata.email && formdata.password){
		axiosInstance.post('users/', {
			'email': formdata.email,
			'password': formdata.password
		}).then((res) => {
			navigate('/login');
		})
	} else {
		alert('Email or password is empty');
	};
  };

  return (
	<Grid container sx={{
		height: '100vh', 
		width: '100vw', 
		backgroundImage: `url(${BackgroundImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	}}>
		<CssBaseline />
		<Container sx={{
			  m: 0,
			  position: 'absolute',
			  display: 'flex',
			  top: '50%',
			  transform: 'translateY(-50%)',
			  width: '50%',
			  left: '25%',
		}}>
			<CssBaseline />
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
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
					>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" sx={{color:'white'}}>
						Register
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, color:'white' }}>
						<CssTextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleChange}
							sx = {{input: { color: 'white' }}}
							
						/>
						<CssTextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handleChange}
							sx = {{input: { color: 'white' }}}
						/>
						<FormControlLabel 
							control={<Checkbox value="remember" sx={{color:'white'}} />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
							<Link href="/login" variant="body2">
								{"Already have an account? Login"}
							</Link>
							</Grid>
						</Grid>
						<Copyright />
					</Box>
				</Box>
			</Grid>
		</Container>
	</Grid>
);
}