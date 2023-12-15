export const IS_LOADING_DISSERATION_REQUESTS = 'IS_LOADING_DISSERATION_REQUESTS';

export const SET_DISSERATION_REQUESTS = 'SET_DISSERATION_REQUESTS';

export const setIsLoadingDissertationRequests = (payload) => ({
	type: IS_LOADING_DISSERATION_REQUESTS,
	payload,
});

export const setDissertationRequests = (payload) => ({
	type: SET_DISSERATION_REQUESTS,
	payload,
});