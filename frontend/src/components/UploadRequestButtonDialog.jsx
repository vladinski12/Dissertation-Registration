import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from '@mui/material';
import { useCallback, useContext, useState, } from 'react';
import { ApprovedDissertationRequestsContext, } from '../state/context/ApprovedDissertationRequestsContext/ApprovedDissertationRequestsContext';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { showToast, } from './templates/ToastMessage';
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

export default function UploadRequestButtonDialog({ dissertationRequest, }) {
	const { uploadFileAndApprove, } = useContext(
		ApprovedDissertationRequestsContext
	);
	const [open, setOpen] = useState(false);

	const handleFileChange = useCallback((event) => {
		const file = event.target.files[0];
		if (!file || file.type !== 'application/pdf' || file.size > 10000000) {
			showToast('File must be a pdf and have a size less than 1MB', 'error');
			return;
		}
		uploadFileAndApprove(dissertationRequest.id, file);
		setOpen(false);
		window.location.reload();
	}, [dissertationRequest]);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<>
			<Button
				sx={{
					maxHeight: '2.5rem',
					alignSelf: 'center',
					lineHeight: '1rem',
				}}
				variant='text'
				onClick={ handleClickOpen }
			>
				APPROVE
			</Button>
			<Dialog
				open={ open }
				onClose={ handleClose }>
				<DialogTitle>Approve dissertation request</DialogTitle>
				<Tooltip title='Close'>
					<IconButton
						aria-label='close'
						onClick={ handleClose }
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon/>
					</IconButton>
				</Tooltip>
				<DialogContent>
					<DialogContentText>
						Please upload a file to approve the dissertation request
					</DialogContentText>
					<DialogActions>
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
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
}
