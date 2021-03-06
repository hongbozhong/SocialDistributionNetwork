//material ui
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

//react and react-router-dom
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//local
import axiosInstance from '../axiosinstance';
import CssTextField from "../components/csstextfield";
import Copyright from "../components/copyright";





export default function Register() {
	const navigate = useNavigate()
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

		if (formdata.email && formdata.password && formdata.password===formdata.confirmPassword){
			axiosInstance.post('/users/', {
				email: formdata.email,
				password: formdata.password
			}).then((res) => {
				localStorage.setItem('refresh_token', res.data.refresh);
				localStorage.setItem('access_token', res.data.access);
				axiosInstance.defaults.headers['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
				navigate('/');
			}).catch((error) => {
				console.log("register error",error);
			})
		} else {
			alert('Email or password is empty');
		};
	};

	return (
		<Container>
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
			</Box>
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
					size="small"
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
					size="small"
					sx = {{input: { color: 'white' }}}
				/>
				<CssTextField
					margin="normal"
					required
					fullWidth
					name="confirmPassword"
					label="confirmPassword"
					type="password"
					id="confirmPassword"
					onChange={handleChange}
					size="small"
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
					<Link to="/join/login" style={{color:'#3498DB'}}>         {/*light blue #3498DB*/}
						{"Already have an account? Login"}
					</Link>
					</Grid>
				</Grid>
				<Copyright />
			</Box>
		</Container>
	);
}