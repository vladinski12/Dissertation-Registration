import { Box, Button, MenuItem, TextField, Typography, } from '@mui/material';
import { Link, useNavigate, } from 'react-router-dom';
import FormikBase from '../components/templates/FormikBase';
import { UserRole, } from '../utils/constants.js';
import { registerSchema, } from '../utils/yupSchemas.js';
import { registerSubmitHandler, } from '../utils/calls/authCalls.js';
import { useCallback, } from 'react';

export default function Register() {
	const navigate = useNavigate();

	const submitHandler = useCallback(async (values, helpers) => {
		delete values.confirmPassword;
		if (await registerSubmitHandler(values, helpers)) navigate('/login');
	}, []);

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
				sx={{ my: 5, }}
				variant='h1'>
				Register
			</Typography>
			<FormikBase
				initialValues={{
					name: '',
					email: '',
					userRole: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={ registerSchema }
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
							sx={{
								width: '100%',
							}}
							id='name'
							label='Name'
							variant='outlined'
							type='text'
							autoComplete='name'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.name }
							error={ touched.name && Boolean(errors.name) }
							helperText={ touched.name && errors.name }
						/>
						<TextField
							sx={{
								width: '100%',
							}}
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
						/>
						<TextField
							fullWidth
							name='userRole'
							label='User Role'
							variant='outlined'
							select
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.userRole }
							error={ touched.userRole && Boolean(errors.userRole) }
							helperText={ touched.userRole && errors.userRole }
						>
							<MenuItem
								value={ '' }
								disabled>
								Select an option
							</MenuItem>
							<MenuItem value={ UserRole.STUDENT }>Student</MenuItem>
							<MenuItem value={ UserRole.PROFESSOR }>Professor</MenuItem>
						</TextField>
						<TextField
							sx={{
								width: '100%',
							}}
							id='password'
							label='Password'
							variant='outlined'
							type='password'
							autoComplete='new-password'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.password }
							error={ touched.password && Boolean(errors.password) }
							helperText={ touched.password && errors.password }
						/>
						<TextField
							sx={{
								width: '100%',
							}}
							id='confirmPassword'
							label='Confirm Password'
							variant='outlined'
							type='password'
							autoComplete='new-password'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.confirmPassword }
							error={ touched.confirmPassword && Boolean(errors.confirmPassword) }
							helperText={ touched.confirmPassword && errors.confirmPassword }
						/>
						<Button
							type='submit'
							onClick={ handleSubmit }
							sx={{ my: 2, }}>
							REGISTER
						</Button>
					</Box>
				)}
			</FormikBase>
			<Box sx={{ my: 2, }}>
				<Link to='/login'>Login</Link>
			</Box>
		</Box>
	);
}
