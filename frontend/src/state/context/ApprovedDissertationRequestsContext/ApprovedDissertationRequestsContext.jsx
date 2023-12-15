import{ createContext, useCallback, useMemo, useReducer } from 'react';
import { setApprovedDissertationRequests as setApprovedDissertationRequestsAction, setIsLoadingApprovedDissertationRequests as setIsLoadingApprovedDissertationRequestsAction } from '../../actions/approvedDissertationRequestsActions';
import API from '../../../app/api';
import { approvedDisserationRequestsInitialState } from '../../../utils/constants';
import approvedDissertationRequestsReducer from '../reducers/approvedDissertationRequestsReducer';
import { showToast } from '../../../components/templates/ToastMessage';

export const ApprovedDissertationRequestsContext = createContext({ context: approvedDisserationRequestsInitialState });

const ApprovedDissertationRequestsProvider = ({ children }) => {
	const [context, dispatch] = useReducer(approvedDissertationRequestsReducer, approvedDisserationRequestsInitialState);

	const getApprovedDissertationRequests = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await API.dissertationRequests.getApprovedDissertationRequests({
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response?.data) {
				dispatch(setApprovedDissertationRequestsAction(response.data));
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setIsLoading(false);
		}
	}, []);

	const setIsLoading = (is)=>{
		dispatch(setIsLoadingApprovedDissertationRequestsAction(is));
	};

	const value = useMemo(() => ({
		approvedDissertationRequests: context.approvedDissertationRequests,
		isLoadingApprovedDissertationRequests: context.isLoadingApprovedDissertationRequests,
		getApprovedDissertationRequests,
		setIsLoading,
	}), [context]);

	return <ApprovedDissertationRequestsContext.Provider value={ value }>{children}</ApprovedDissertationRequestsContext.Provider>;
};

export default ApprovedDissertationRequestsProvider;