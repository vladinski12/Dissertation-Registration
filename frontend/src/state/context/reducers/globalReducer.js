import {
	IS_LOADING,
	SET_ID,
	SET_IS_LOGGED_IN,
	SET_NAME,
	SET_ROLE,
} from '../../actions/globalActions.js';

export default function globalReducer(state, action) {
	switch (action.type) {
		case IS_LOADING: {
			return { ...state, isLoading: action.payload, };
		}
		case SET_IS_LOGGED_IN: {
			return { ...state, isLoggedIn: action.payload, };
		}
		case SET_ROLE: {
			return { ...state, role: action.payload, };
		}
		case SET_ID: {
			return { ...state, id: action.payload, };
		}
		case SET_NAME: {
			return { ...state, name: action.payload, };
		}
		default:
			return state;
	}
}
