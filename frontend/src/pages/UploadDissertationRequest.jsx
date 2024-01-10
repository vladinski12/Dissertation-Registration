import { Box, Button, Container, Typography, } from '@mui/material';
import { useCallback, useContext, useEffect, useState, } from 'react';
import API from '../app/api';
import ApprovedDissertationRequestStatusChip from '../components/ApprovedDissertationRequestStatusChip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Context, } from '../state/context/GlobalContext/Context';
import { DissertationRequestStatus, } from '../utils/constants';
import OpenFileContainer from '../components/OpenFileContainer';
import { formatDate, } from '../utils/dateHelpers';
import { showToast, } from '../components/templates/ToastMessage';
import { styled, } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const UploadDissertationRequest = () => {
	const {
		context: { role, },
	} = useContext(Context);

	const [dissertationRequest, setDissertationRequest] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await API.dissertationRequests.getDissertationRequests(
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				if (response?.data) {
					setDissertationRequest(
						response.data.DissertationRequests.filter(
							(dissertationRequest) =>
								dissertationRequest.status ===
									DissertationRequestStatus.APPROVED ||
								dissertationRequest.status ===
									DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT ||
								dissertationRequest.status ===
									DissertationRequestStatus.APPROVED_REJECTED ||
								dissertationRequest.status ===
									DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR
						)[0]
					);
				}
			} catch (error) {
				showToast(error?.response?.data?.message, 'error');
			}
		})();
	}, []);

	const handleFileChange = useCallback(
		async (event) => {
			const file = event.target.files[0];
			if (!file || file.type !== 'application/pdf' || file.size > 10000000) {
				showToast('File must be a pdf and have a size less than 1MB', 'error');
				return;
			}
			try {
				const formData = new FormData();
				formData.append('file', file);
				const response =
					await API.dissertationRequests.uploadDissertationRequestFile(
						dissertationRequest?.id,
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
								Authorization: `Bearer ${localStorage.getItem('token')}`,
							},
						}
					);
				if (response?.data) {
					showToast(response.data.message, 'success');
				}
			} catch (error) {
				showToast(error?.response?.data?.message, 'error');
			} finally {
				window.location.reload();
			}
		},
		[dissertationRequest]
	);

	if (!dissertationRequest) {
		return (
			<Container
				sx={{
					my: 5,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '4rem',
				}}
			>
				<Typography variant='h4'>Upload Dissertation Request</Typography>
				<Typography variant='h6'>
					You don&apos;t have an approved dissertation request
				</Typography>
			</Container>
		);
	} else
		return (
			<Container
				sx={{
					my: 5,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '4rem',
				}}
			>
				<Box
					sx={{
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant='h4'>Upload Dissertation Request</Typography>
					<Typography
						sx={{ maxWidth: '50rem', }}
						variant='h6'>
						Your dissertation request was{' '}
						{dissertationRequest?.status ===
						DissertationRequestStatus.APPROVED_REJECTED
							? 'rejected'
							: 'approved'}{' '}
						by professor {dissertationRequest?.professor.user.name} on{' '}
						{formatDate(dissertationRequest?.updatedAt)}
					</Typography>
					<ApprovedDissertationRequestStatusChip
						status={ dissertationRequest?.status }
						tooltipDirection='bottom'
					/>
				</Box>
				<OpenFileContainer
					role={ role }
					dissertationRequest={ dissertationRequest }/>
				{dissertationRequest?.status === DissertationRequestStatus.APPROVED && (
					<>
						<Button
							component='label'
							variant='contained'
							startIcon={ <CloudUploadIcon/> }
						>
							Upload file
							<VisuallyHiddenInput
								type='file'
								onChange={ handleFileChange }
								accept='application/pdf'
							/>
						</Button>
						<Typography variant='h8'>Only pdf files are accepted</Typography>
					</>
				)}
			</Container>
		);
};

export default UploadDissertationRequest;
