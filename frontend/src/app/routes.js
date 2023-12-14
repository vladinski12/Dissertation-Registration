export const APP_ROUTES = {
	dissertationRequestsList: '/requests',
	professorsList: '/professors',
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
		handlePreliminaryDissertationRequest: (id) => `dissertation/handle-preliminary-dissertation-request/${id}`,
	},
	professors: {
		getProfessors: 'professor/available-professors',
	},
};
