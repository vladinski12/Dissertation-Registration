import  createTheme  from '@mui/material/styles/createTheme';
import { red, } from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: {
			main: '#556cd6',
		},
		secondary: {
			main: '#19857b',
		},
		error: {
			main: red.A400,
		},
		textColor: {
			main: '#fff',
			selected: '#fff',
		},
	},
});

export default theme;
