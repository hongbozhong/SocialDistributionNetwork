import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react'
import Login from 'components/login'
import Register from 'components/register'


ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<Header />
			<Routes>
				<Route exact path="/" component={App} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/logout" component={Logout} />
			</Routes>
			<Footer />
		</React.StrictMode>
	</BrowserRouter>,
    document.getElementById('app')
);