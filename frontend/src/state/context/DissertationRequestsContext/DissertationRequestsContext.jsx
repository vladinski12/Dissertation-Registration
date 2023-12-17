import { DissertationRequestStatus, dissertationRequestsInitialState, } from '../../../utils/constants';
import{ createContext, useCallback, useMemo, useReducer, } from 'react';
import { setDissertationRequests as setDissertationRequestsAction, setIsLoadingDissertationRequests as setIsLoadingDissertationRequestsAction, } from '../../actions/dissertationRequestsActions';
import API from '../../../app/api';
import dissertationRequestsReducer from '../reducers/dissertationRequestsReducer';
import { showToast, } from '../../../components/templates/ToastMessage';

export const DissertationRequestsContext = createContext({ context: dissertationRequestsInitialState, });

const DissertationRequestsProvider = ({ children, }) => {
	const [context, dispatch] = useReducer(dissertationRequestsReducer, dissertationRequestsInitialState);

	const getDissertationRequests = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await API.dissertationRequests.getDissertationRequests({
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			if (response?.data) {
				dispatch(setDissertationRequestsAction(response.data.DissertationRequests.filter(
					(dissertationRequest) =>
						dissertationRequest.status === DissertationRequestStatus.PENDING_APPROVAL ||
						dissertationRequest.status === DissertationRequestStatus.APPROVED ||
						dissertationRequest.status === DissertationRequestStatus.DECLINED
				)));
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setIsLoading(false);
		}
	}, []);

	const approveDissertationRequest = useCallback(async (dissertationRequestId) => {
		try {
			setIsLoading(true);
			const response = await API.dissertationRequests.handlePreliminaryDissertationRequest(
				dissertationRequestId,
				{
					status: 'APPROVED',
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response.status === 200) {
				showToast('Dissertation request approved successfully', 'success');
				getDissertationRequests();
			}else{
				showToast(response?.data?.message, 'warning');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setIsLoading(false);
		}
	}, []);

	const declineDissertationRequest = useCallback(async (dissertationRequestId, declinedReason) => {
		try {
			setIsLoading(true);
			const response = await API.dissertationRequests.handlePreliminaryDissertationRequest(
				dissertationRequestId,
				{
					status: 'DECLINED',
					declinedReason,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response.status === 200) {
				showToast('Dissertation request declined successfully', 'success');
				getDissertationRequests();
			}else{
				showToast(response?.data?.message, 'warning');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setIsLoading(false);
		}
	}, []);

	const setIsLoading = (is)=>{
		dispatch(setIsLoadingDissertationRequestsAction(is));
	};

	const value = useMemo(() => ({
		dissertationRequests: context.dissertationRequests,
		isLoadingDissertationRequests: context.isLoadingDissertationRequests,
		getDissertationRequests,
		approveDissertationRequest,
		declineDissertationRequest,
		setIsLoading,
	}), [context]);

	return <DissertationRequestsContext.Provider value={ value }>{children}</DissertationRequestsContext.Provider>;
};

export default DissertationRequestsProvider;