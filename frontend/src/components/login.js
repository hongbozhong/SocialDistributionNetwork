import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="https://mui.com/">
			Your Website
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
	const history = useNavigate()
	const [formdata, updataformdata] = useState()

	const handleChange = (e) => {
		updataformdata({
			...formdata,
			[e.target.name]: e.target.value,
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formdata);
		axiosInstance.post('api/token', {
			email: formdata.email,
			password: formdata.password
		}).then((res) => {
			localStorage.setItem('refresh_token', res.data.refresh)
			localStorage.setItem('access_token', res.data.access)
			axiosInstance.defaults.headers['Authorization'] = 'Bearer '+localStorage.getItem('access_token')
			history.push('/')
		})
	};

	return (
		<ThemeProvider theme={theme}>
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
			item
			xs={false}
			sm={4}
			md={7}
			sx={{
				backgroundImage: 'url(https://source.unsplash.com/random)',
				backgroundRepeat: 'no-repeat',
				backgroundColor: (t) =>
				t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
				<Typography component="h1" variant="h5">
				Sign in
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
					onChange={handleChange}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={{handleChange}}
				/>
				<FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Remember me"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
					<Link href="#" variant="body2">
						Forgot password?
					</Link>
					</Grid>
					<Grid item>
					<Link href="register/" variant="body2">
						{"Don't have an account? Register"}
					</Link>
					</Grid>
				</Grid>
				<Copyright sx={{ mt: 5 }} />
				</Box>
			</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	);
	}