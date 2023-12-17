import { DissertationRequestStatus, approvedDissertationRequestsInitialState, } from '../../../utils/constants';
import{ createContext, useCallback, useMemo, useReducer, } from 'react';
import { setApprovedDissertationRequests as setApprovedDissertationRequestsAction, setIsLoadingApprovedDissertationRequests as setIsLoadingApprovedDissertationRequestsAction, } from '../../actions/approvedDissertationRequestsActions';
import API from '../../../app/api';
import approvedDissertationRequestsReducer from '../reducers/approvedDissertationRequestsReducer';
import { showToast, } from '../../../components/templates/ToastMessage';

export const ApprovedDissertationRequestsContext = createContext({ context: approvedDissertationRequestsInitialState, });

const ApprovedDissertationRequestsProvider = ({ children, }) => {
	const [context, dispatch] = useReducer(approvedDissertationRequestsReducer, approvedDissertationRequestsInitialState);

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

	const uploadFileAndApprove = useCallback(async (dissertationRequestId, file) => {
		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('status', DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR);
			const response = await API.dissertationRequests.uploadApprovedDissertationRequest(
				dissertationRequestId,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
			if (response?.status === 200) {
				showToast('Dissertation request approved', 'success');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
			getApprovedDissertationRequests();
		}
		finally{
			setIsLoading(false);
		}
	}, []);

	const setIsLoading = (is)=>{
		dispatch(setIsLoadingApprovedDissertationRequestsAction(is));
	};

	const declineRequest = useCallback(async (dissertationRequestId) => {
		try {
			setIsLoading(true);
			const formData = new FormData();
			formData.append('status', DissertationRequestStatus.APPROVED_REJECTED);
			const response = await API.dissertationRequests.declineDissertationRequest(
				dissertationRequestId,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
			if (response?.status === 200) {
				showToast('Dissertation request declined', 'success');
				getApprovedDissertationRequests();
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setIsLoading(false);
		}
	}, []);

	const value = useMemo(() => ({
		approvedDissertationRequests: context.approvedDissertationRequests,
		isLoadingApprovedDissertationRequests: context.isLoadingApprovedDissertationRequests,
		getApprovedDissertationRequests,
		uploadFileAndApprove,
		declineRequest,
		setIsLoading,
	}), [context]);

	return <ApprovedDissertationRequestsContext.Provider value={ value }>{children}</ApprovedDissertationRequestsContext.Provider>;
};

export default ApprovedDissertationRequestsProvider;