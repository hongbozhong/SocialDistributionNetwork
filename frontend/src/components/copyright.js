import Typography from '@mui/material/Typography';

export default function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" sx={{color: 'white', mt: 5}}>
			{'Copyright © Meteor '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}