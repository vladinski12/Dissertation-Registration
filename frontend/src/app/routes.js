export const APP_ROUTES = {
	dissertationRequestsList: '/requests',
	professorsList: '/professors',
	approvedDissertationRequestsList: '/approved-requests',
	uploadDissertationRequest: '/upload-request',
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
		getApprovedDissertationRequests:
			'dissertation/get-approved-dissertation-requests',
		createDissertationRequest: 'dissertation/create-dissertation-request',
		handlePreliminaryDissertationRequest: (id) =>
			`dissertation/handle-preliminary-dissertation-request/${id}`,
		uploadDissertationRequestFile: (id) =>
			`dissertation/upload-dissertation-request/${id}`,
		declineDissertationRequest: (id) =>
			`dissertation/decline-dissertation-request/${id}`,
		uploadApprovedDissertationRequest: (id) =>
			`dissertation/upload-approved-dissertation-request/${id}`,
	},
	professors: {
		getProfessors: 'professor/available-professors',
	},
};
