import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

/*
axiosInstance.interceptors.request.use(
	(request) => {
		request.headers.Authorization = localStorage.getItem('access_token')
										? 'JWT ' + localStorage.getItem('access_token')
										: null;
	},
	(error) => {
		Promise.reject(error);
	}
)
*/

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const requsetConfig = error.config;
		const response = error.response;
		console.log("axiosInstance error response", response);
		console.log("axiosInstance error requestconfig", requsetConfig);
		if (!error.request) {                                                                   //request config error
			console.log('no request is even generated,  error in request setup');
		} else if (!response) {                                                          //np reponse received
			alert(
				'No response from the server' +
				'Probably a server/network error occurred. ' 
			)
			return Promise.reject(error);
		} else {
			//handle error when the response status is 401                                                       
			if (response.status === 401 && response.statusText === 'Unauthorized'){
				const refreshToken = localStorage.getItem('refresh_token');

				if (requsetConfig.url === '/api/token/'){     // request from login page failed
					alert('Email or password is not correct');
					return Promise.reject(error)
				} else {                                // try to use refreshtoken to get new access token
					if (!refreshToken){           // refresh token is not available or expired
						window.location.href = '/join/login';
						return Promise.reject(error);
					} else {      
						const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

						const now = Math.ceil(Date.now() / 1000);
						console.log('axiosinstance exp', tokenParts.exp);
						
						if (tokenParts.exp < now) {   // refrshtoken expired
							console.log('Refresh token is expired', tokenParts.exp, now);
							window.location.href = '/join/login';
						} else {       
							return axiosInstance.post('/api/token/refresh/', { refresh: refreshToken })
								.then((response) => {
									localStorage.setItem('access_token', response.data.access);
									localStorage.setItem('refresh_token', response.data.refresh);

									axiosInstance.defaults.headers['Authorization'] =
										'JWT ' + response.data.access;
									requsetConfig.headers['Authorization'] =
										'JWT ' + response.data.access;

									return axiosInstance(requsetConfig);
								})
								.catch((err) => {
									console.log(err);
								});
						} 
					}
				}
			}

			//when the response status code is not 401
			console.log('request for the error that is not handled', error.config)
			return Promise.reject(error);
		}
	}
);

export default axiosInstance;
