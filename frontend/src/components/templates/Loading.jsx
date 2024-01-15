import { Box, } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading(){
	return (
		<Box sx={{ width: '100vw', }}>
			<LinearProgress/>
		</Box>
	);
}