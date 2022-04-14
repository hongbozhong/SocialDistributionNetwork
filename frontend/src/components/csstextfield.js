import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
	  	color: '#96FF33',                // very light green
	},
	'& label.MuiInputLabel-root':{
		color: '#96FF33',
	},
	'& .MuiOutlinedInput-root': {
		'&.Mui-focused fieldset': {
		  	borderColor: '#3CFF33',          // light green
			boxShadow: '0 0 10px #3CFF33',
		},
		'&:hover fieldset': {
			borderColor: '#3CFF33',
		},
		'& fieldset': {
			borderColor: '#0E7D3C',         // dark green
		},
	},
	'& .MuiOutlinedInput-input': {
		color: 'white',
	}
});

export default CssTextField;