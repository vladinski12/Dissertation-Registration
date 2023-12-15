import { IS_LOADING_DISSERATION_REQUESTS, SET_DISSERATION_REQUESTS } from '../../actions/dissertationRequestsActions';

export default function dissertationRequestsReducer(state, action) {
	switch (action.type) {
		case IS_LOADING_DISSERATION_REQUESTS: {
			return { ...state, isLoadingDissertationRequests: action.payload };
		}
		case SET_DISSERATION_REQUESTS: {
			return { ...state, dissertationRequests: action.payload };
		}
		default:
			return state;
	}
}