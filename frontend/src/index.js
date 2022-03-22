import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import React from 'react'
import ReactDOM from 'react-dom';
import Login from './pages/login'
import Logout from './pages/logout'
import Register from './pages/register'
import Home from './pages/home'
import Layout from './layout'
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { blue, green } from '@mui/material/colors';


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

console.log(theme);

const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Layout />} />		
						<Route exact path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
};

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
    document.getElementById('root')
);