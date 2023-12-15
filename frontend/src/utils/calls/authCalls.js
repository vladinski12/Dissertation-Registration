import API from '../../app/api';
import { showToast } from '../../components/templates/ToastMessage';

export const loginSubmitHandler = async (values, helpers) => {
	try {
		const response = await API.auth.login(values, {
			headers: { 'Content-Type': 'application/json' },
		});
		if (response?.data) {
			return response.data.access_token;
		}
	} catch (err) {
		if (err?.response?.status === 400) {
			return helpers.setFieldError('password', 'Invalid login credentials');
		}
		showToast(err?.response?.data?.message, 'error');
	}
};

export const registerSubmitHandler = async (values, helpers) => {
	try {
		const response = await API.auth.register(values, {
			headers: { 'Content-Type': 'application/json' },
		});
		if(response?.status === 200) {
			showToast('Registration successful', 'success');
			return true;
		}
	} catch (err) {
		if (err?.response?.status === 400) {
			return helpers.setFieldError('email', 'Email already exists');
		}
		showToast(err?.response?.data?.message, 'error');
	}
};
