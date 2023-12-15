export const initialState = {
	isLoading: true,
	isLoggedIn: false,
	role: null,
	id: '',
	name: '',
};

export const disserationRequestsInitialState = {
	isLoadingDissertationRequests: true,
	dissertationRequests: [],
};

export const approvedDisserationRequestsInitialState = {
	isLoadingApprovedDissertationRequests: true,
	approvedDissertationRequests: [],
};

export const UserRole = {
	PROFESSOR: 'PROFESSOR',
	STUDENT: 'STUDENT',
};

export const UserRoleArray = [UserRole.PROFESSOR, UserRole.STUDENT];

export const DissertationRequestStatus = {
	PENDING_APPROVAL: 'PENDING_APPROVAL',
	APPROVED: 'APPROVED',
	DECLINED: 'DECLINED',
	APPROVED_REJECTED: 'APPROVED_REJECTED',
	FILE_UPLOADED_BY_STUDENT: 'FILE_UPLOADED_BY_STUDENT',
	FILE_UPLOADED_BY_PROFESSOR: 'FILE_UPLOADED_BY_PROFESSOR',
};

function stringToColor(string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}

export function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
	};
}

export const MAX_NUMBER_OF_APPROVED_REQUESTS = 15;