import axios from 'axios';
import { API_ROUTES } from './routes';

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/',
});

const API = {
	auth: {
		login: (data, options) =>
			axiosInstance.post(API_ROUTES.auth.login, data, options),
		register: (data, options) =>
			axiosInstance.post(API_ROUTES.auth.register, data, options),
		myProfile: (options) =>
			axiosInstance.get(API_ROUTES.auth.myProfile, options),
	},
	dissertationRequests: {
		getDissertationRequests: (options) =>
			axiosInstance.get(
				API_ROUTES.dissertationRequests.getDissertationRequests,
				options
			),
	},
};

export default API;
