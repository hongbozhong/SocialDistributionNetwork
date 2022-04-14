import React from 'react'

import Typography from '@mui/material/Typography';


class RedirectToLogin extends React.Component{

    componentDidMount(){
        window.location.replace('/join/login');
    }

    render() {
        return (<Typography color='secondary'>Useless Link</Typography>)
    }
}

export default RedirectToLogin;