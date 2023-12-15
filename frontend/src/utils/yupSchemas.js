import * as yup from 'yup';
import { UserRoleArray } from './constants';

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.email('Email must be valid')
		.required('Email is required'),
	password: yup.string().required('Password is required'),
});

export const registerSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Email must be valid')
		.required('Email is required'),
	userRole: yup.string().required('Type is required').oneOf(UserRoleArray),
	password: yup.string().required('Password is required'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});
