/* eslint-disable react-refresh/only-export-components */
import ApprovedDissertationRequestsProvider, {
	ApprovedDissertationRequestsContext,
} from '../state/context/ApprovedDissertationRequestsContext/ApprovedDissertationRequestsContext';
import {
	Button,
	Container,
	Divider,
	List,
	ListItem,
	Stack,
	Typography,
} from '@mui/material';
import { Fragment, useCallback, useContext, useEffect, } from 'react';
import ApprovedDissertationRequestStatusChip from '../components/ApprovedDissertationRequestStatusChip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DissertationRequestStatus, } from '../utils/constants';
import HandleRequestButtonDialog from '../components/HandleRequestButtonDialog';
import Loading from '../components/templates/Loading';
import { formatDate, } from '../utils/dateHelpers';
import withProviders from '../state/hooks/withProviders';

const ApprovedDissertationRequestsList = () => {
	const {
		isLoadingApprovedDissertationRequests,
		approvedDissertationRequests,
		getApprovedDissertationRequests,
	} = useContext(ApprovedDissertationRequestsContext);

	useEffect(() => {
		getApprovedDissertationRequests();
	}, []);

	const handleOpenFileClick = useCallback((approvedDissertationRequest)=>() => {
		window.open(`${import.meta.env.VITE_PDF_STORAGE_URL}${approvedDissertationRequest.professorFile.filename}`, '_blank');
	}, []);

	if (isLoadingApprovedDissertationRequests) return <Loading/>;
	else
		return (
			<Container
				sx={{
					my: 5,
				}}
			>
				<Typography variant='h4'>Approved Requests List</Typography>
				<List>
					{approvedDissertationRequests.map((approvedDissertationRequest) => {
						return (
							<Fragment key={ approvedDissertationRequest.id }>
								<Stack
									direction='row'
									spacing={ 3 }>
									<ListItem
										alignItems='flex-start'
										sx={{
											display: 'flex',
											flexDirection: 'column',
											m: 2,
										}}
									>
										<ApprovedDissertationRequestStatusChip
											status={ approvedDissertationRequest.status }
										/>
										<Typography>
											From {approvedDissertationRequest.student.user.name} (
											{approvedDissertationRequest.student.user.email})
										</Typography>
										<Typography>
											Created at{' '}
											{formatDate(approvedDissertationRequest.createdAt)}
										</Typography>
									</ListItem>
									{approvedDissertationRequest.status ===
									DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT &&
										<HandleRequestButtonDialog
											dissertationRequest={ approvedDissertationRequest }
										/>
									}
									{approvedDissertationRequest.status === DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR &&
										<Button
											component='label'
											variant='contained'
											startIcon={ <CloudUploadIcon/> }
											sx={{
												maxHeight: '2.5rem',
												alignSelf: 'center',
												lineHeight: '1rem',
											}}
											onClick={ handleOpenFileClick(approvedDissertationRequest) }

										>
											Uploaded File
										</Button>
									}
								</Stack>
								<Divider
									sx={{
										m: 2,
										alignSelf: 'center',
									}}
									variant='inset'
									component='li'
								/>
							</Fragment>
						);
					})}
				</List>
			</Container>
		);
};

export default withProviders(ApprovedDissertationRequestsProvider)(
	ApprovedDissertationRequestsList
);
