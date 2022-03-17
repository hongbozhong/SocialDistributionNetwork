import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom';
import Login from './components/login'
import Logout from './components/logout'
import Register from './components/register'
import Home from './Home'


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
				</Routes>
		</BrowserRouter>
	</React.StrictMode>,
    document.getElementById('root')
);