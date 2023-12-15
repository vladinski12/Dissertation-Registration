import { Box, Button, TextField, Typography } from '@mui/material';
import FormikBase from '../components/templates/FormikBase';
import { Link } from 'react-router-dom';
import { loginSchema } from '../utils/yupSchemas.js';
import { loginSubmitHandler } from '../utils/calls/authCalls.js';
import useAuth from '../state/hooks/useAuth.js';

export default function Login() {
	const { setToken } = useAuth();

	async function submitHandler(values, helpers) {
		const token = await loginSubmitHandler(values, helpers);
		if (token) {
			setToken(token);
		}
	}

	return (
		<Box
			component='div'
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Typography
				variant='h1'>Login</Typography>
			<FormikBase
				initialValues={{ email: '', password: '' }}
				validationSchema={ loginSchema }
				onSubmit={ submitHandler }
			>
				{({
					values,
					touched,
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
				}) => (
					<Box
						component='form'
						sx={{
							width: '100%',
							maxWidth: '25rem',
							height: '100%',
							maxHeight: '25rem',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '1rem',
						}}
						autoComplete='on'
					>
						<TextField
							id='email'
							label='Email'
							variant='outlined'
							type='email'
							autoComplete='email'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.email }
							error={ touched.email && Boolean(errors.email) }
							helperText={ touched.email && errors.email }
						></TextField>
						<TextField
							id='password'
							label='Password'
							variant='outlined'
							type='password'
							autoComplete='current-password'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.password }
							error={ touched.password && Boolean(errors.password) }
							helperText={ touched.password && errors.password }
						></TextField>
						<Button
							type='submit'
							onClick={ handleSubmit }
							sx={{ my: 2 }}>LOGIN</Button>
					</Box>
				)}
			</FormikBase>
			<Link to='/register'>Register</Link>
		</Box>
	);
}
