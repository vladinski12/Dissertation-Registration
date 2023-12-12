import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
			selected: '#000',
		},
	},
});

export default theme;
