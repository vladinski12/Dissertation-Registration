export const IS_LOADING = 'IS_LOADING';

export const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';

export const SET_ROLE = 'SET_ROLE';

export const SET_ID = 'SET_ID';

export const SET_NAME = 'SET_NAME';

export const setIsLoading = (payload) => ({
	type: IS_LOADING,
	payload,
});

export const setIsLoggedIn = (payload) => ({
	type: SET_IS_LOGGED_IN,
	payload,
});

export const setRole = (payload) => ({
	type: SET_ROLE,
	payload,
});

export const setId = (payload) => ({
	type: SET_ID,
	payload,
});

export const setName = (payload) => ({
	type: SET_NAME,
	payload,
});
