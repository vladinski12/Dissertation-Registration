import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, } from '@mui/material';
import { DissertationRequestStatus, UserRole, } from '../utils/constants';
import  { useCallback, useContext, useState, } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Context, } from '../state/context/GlobalContext/Context';
import DeclinePreliminaryRequestButtonDialog from './DeclinePreliminaryRequestButtonDialog';
import { DissertationRequestsContext, } from '../state/context/DissertationRequestsContext/DissertationRequestsContext';
import MessageIcon from '@mui/icons-material/Message';

export default function HandlePreliminaryRequestButtonDialog({ dissertationRequest, }){
	const {
		context: { role, },
	} = useContext(Context);
	const { approveDissertationRequest, } = useContext(DissertationRequestsContext);

	const [open, setOpen] = useState(false);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleApprove = useCallback(() => {
		approveDissertationRequest(dissertationRequest.id);
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
			Open message
		</Button>
		<Dialog
			open={ open }
			onClose={ handleClose }>
			<DialogTitle sx={{ m: 0, pr: 6, }}>Message {role === UserRole.PROFESSOR ? `from ${dissertationRequest.student.user.name}` : `to ${dissertationRequest.professor.user.name}`} {}</DialogTitle>
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
					{role === UserRole.STUDENT ? 'Your' : 'Student'} message: {dissertationRequest.studentMessage}
				</DialogContentText>
				{dissertationRequest.status === DissertationRequestStatus.DECLINED && <DialogContentText>
					Declined reason: {dissertationRequest.declinedReason}
				</DialogContentText>}
			</DialogContent>
			{(role === UserRole.PROFESSOR && dissertationRequest.status === DissertationRequestStatus.PENDING_APPROVAL) &&
			<DialogActions>
				<DeclinePreliminaryRequestButtonDialog
					dissertationRequest={ dissertationRequest }/>
				<Button onClick={ handleApprove }>Approve</Button>
			</DialogActions>}
		</Dialog>
	</>);
}