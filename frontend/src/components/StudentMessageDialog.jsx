import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DissertationRequestStatus,UserRole } from '../utils/constants';
import  { useContext, useState } from 'react';
import API from '../app/api';
import CloseIcon from '@mui/icons-material/Close';
import { Context } from '../state/context/GlobalContext/Context';
import DeclineRequestDialog from './DeclineRequestDialog';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';
import { showToast } from './templates/ToastMessage';

export default function StudentMessageDialog({ dissertationRequest }){
	const {
		context: { role },
	} = useContext(Context);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleApprove = async () => {
		try {
			const response = await API.dissertationRequests.handlePreliminaryDissertationRequest(
				dissertationRequest.id,
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
				showToast('Disseration request approved successfully', 'success');
			}else{
				showToast(response?.data?.message, 'warning');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setOpen(false);
		}
	};

	return (<>
		<Button
			sx={{
				maxHeight: '2.5rem',
				alignSelf: 'center',
				lineHeight: '1rem',
			}}
			variant="contained"
			endIcon={<MessageIcon/>}
			onClick={handleClickOpen}>
			Open message
		</Button>
		<Dialog
			open={open}
			onClose={handleClose}>
			<DialogTitle sx={{ m: 0, pr: 6 }}>Message {role === UserRole.PROFESSOR ? `from ${dissertationRequest.student.user.name}` : `to ${dissertationRequest.professor.user.name}`} {}</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon/>
			</IconButton>
			<DialogContent>
				<DialogContentText>
					{dissertationRequest.studentMessage}
				</DialogContentText>
			</DialogContent>
			{(role === UserRole.PROFESSOR && dissertationRequest.status === DissertationRequestStatus.PENDING_APPROVAL) &&
			<DialogActions>
				<DeclineRequestDialog
					dissertationRequest={dissertationRequest}
					previousDialogSetClose={handleClose}/>
				<Button onClick={handleApprove}>Approve</Button>
			</DialogActions>}
		</Dialog>
	</>);
}