//mertail ui
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { green } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';

//react and react-router-dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom';

//local
import './index.css';
import JoinLayout from './joinlayout';
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import HomeLayout from './homelayout'
import CreatePost from './pages/createpost';
import Inbox from './pages/inbox'
import RedirectToLogin from './components/redirecttologin'


const theme = createTheme({
	palette: {
		primary: {
			main: '#000000'
		},
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



const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomeLayout />} >		
						<Route index element={<Home />} />
						<Route path="create" element={<CreatePost />} />
						<Route path="inbox" element={<Inbox />} />
					</Route>
					<Route path='/join' element={<JoinLayout />}>
						<Route index element={<RedirectToLogin />}/>
						<Route path="register" element={<Register />} />
						<Route path="login" element={<Login />} />
					</Route>
					<Route path="*" element={
						<>
							<h1>404 Not found</h1>
							<p>There is no matched url in this server</p>
						</>
					}/>
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