import { Link, useNavigate } from 'react-router-dom';
import  { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function NotFound(){
	const navigate = useNavigate();
	const [seconds, setSeconds] = useState(10);

	useEffect(()=>{
		let timer = setInterval(() => {
			setSeconds(prev => prev - 1);
		}, 1000);
		return () => clearInterval(timer);
	});

	useEffect(() => {
		if (seconds === 0) {
			navigate('/');
		}
	}, [seconds, navigate]);

	return (
		<Box
			component="div"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}
		>
			<h1>404</h1>
			<p>Page not found</p>
			<p>Redirecting to <Link to="/">home</Link> in {seconds} seconds</p>
		</Box>
	);
}