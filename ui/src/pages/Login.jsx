import useAuth from '../state/hooks/useAuth.js';
import { Box,TextField,Button } from '@mui/material';
import { loginSubmitHandler } from '../utils/calls/authCalls.js';
import FormikBase from '../components/templates/FormikBase';
import { loginSchema } from '../utils/yupSchemas.js';

export default function Login(){
	const {setToken} = useAuth();

	async function submitHandler(values,helpers){
		const token = await loginSubmitHandler(values,helpers);
		if(token){
			setToken(token);
		} 
	}

	return(
		<Box 
			component="div"
			className='w-screen h-screen flex justify-center items-center'>
			<FormikBase
				initialValues={{email: '',password: ''}}
				validationSchema={ loginSchema }
				onSubmit={ submitHandler }>
				{({values,touched,errors,handleBlur,handleChange,handleSubmit})=>(
					<Box
						className='flex flex-col justify-center items-center'
						sx={{
							'& > :not(style)': { m: 1, width: '25ch' },
						}}
						component="form"
						autoComplete='on'>	
						<TextField
							id="email"
							label="Email"
							variant='outlined'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.email }
							error={ touched.email && Boolean(errors.email) }
							helperText={ touched.email && errors.email }
						>
						</TextField>
						<TextField
							id="password"
							label="Password"
							variant='outlined'
							type='password'
							onChange={ handleChange }
							onBlur={ handleBlur }
							value={ values.password }
							error={ touched.password && Boolean(errors.password) }
							helperText={ touched.password && errors.password }
						>
						</TextField>
						<Button onClick={ handleSubmit }>LOGIN</Button>
					</Box>
				)}
			</FormikBase>
		</Box>
	);
}