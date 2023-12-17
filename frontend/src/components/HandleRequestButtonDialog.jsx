import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, } from '@mui/material';
import  { useCallback, useContext, useState, } from 'react';
import { ApprovedDissertationRequestsContext, } from '../state/context/ApprovedDissertationRequestsContext/ApprovedDissertationRequestsContext';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';
import UploadRequestButtonDialog from './UploadRequestButtonDialog';

export default function HandleRequestButtonDialog({ dissertationRequest, }){

	const { declineRequest, } = useContext(ApprovedDissertationRequestsContext);

	const [open, setOpen] = useState(false);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleDecline = useCallback(() => {
		declineRequest(dissertationRequest.id);
		setOpen(false);
	}, []);

	return (<>
		<Button
			sx={{
				maxHeight: '2.5rem',
				alignSelf: 'center',
				lineHeight: '1rem',
			}}
			variant="contained"
			endIcon={ <MessageIcon/> }
			onClick={ handleClickOpen }>
			Open
		</Button>
		<Dialog
			open={ open }
			onClose={ handleClose }>
			<DialogTitle sx={{ m: 0, pr: 6, }}>Upload a file to approve the dissertation request</DialogTitle>
			<Tooltip title="Close">
				<IconButton
					aria-label="close"
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
					{dissertationRequest.studentMessage}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={ handleDecline }>Decline</Button>
				<UploadRequestButtonDialog dissertationRequest={ dissertationRequest }/>
			</DialogActions>
		</Dialog>
	</>);
}