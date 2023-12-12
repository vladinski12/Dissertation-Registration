export const APP_ROUTES = {
	dissertationRequestsList: '/dissertation-requests-list',
	professorsList: '/professors-list',
	notFound: '*',
};

export const API_ROUTES = {
	auth: {
		login: 'auth/login',
		register: 'auth/register',
		myProfile: 'auth/my-profile',
	},
	dissertationRequests: {
		getDissertationRequests: 'dissertation/get-dissertation-requests',
		createDissertationRequest: 'dissertation/create-dissertation-request',
	},
	professors: {
		getProfessors: 'professor/available-professors',
	},
};
