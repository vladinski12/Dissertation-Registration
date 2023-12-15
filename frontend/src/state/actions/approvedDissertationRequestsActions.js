export const IS_LOADING_APPROVED_DISSERATION_REQUESTS =
	'IS_LOADING_DISSERATION_REQUESTS';

export const SET_APPROVED_DISSERATION_REQUESTS = 'SET_DISSERATION_REQUESTS';

export const setIsLoadingApprovedDissertationRequests = (payload) => ({
	type: IS_LOADING_APPROVED_DISSERATION_REQUESTS,
	payload,
});

export const setApprovedDissertationRequests = (payload) => ({
	type: SET_APPROVED_DISSERATION_REQUESTS,
	payload,
});
