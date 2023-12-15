import { IS_LOADING_APPROVED_DISSERATION_REQUESTS, SET_APPROVED_DISSERATION_REQUESTS } from '../../actions/approvedDissertationRequestsActions';

export default function dissertationRequestsReducer(state, action) {
	switch (action.type) {
		case IS_LOADING_APPROVED_DISSERATION_REQUESTS: {
			return { ...state, isLoadingApprovedDissertationRequests: action.payload };
		}
		case SET_APPROVED_DISSERATION_REQUESTS: {
			return { ...state, approvedDissertationRequests: action.payload };
		}
		default:
			return state;
	}
}