import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import API from '../app/api';
import { showToast } from './templates/ToastMessage';
import { useState } from 'react';

export default function DeclineRequestDialog({ dissertationRequest,previousDialogSetClose }){
	const [open, setOpen] = useState(false);
	const [declinedReason, setDeclinedReason] = useState('');

	const declineRequest = async () => {
		if (!declinedReason.trim() || declinedReason.trim().length < 10 || declinedReason.trim().length > 255) {
			showToast('Please enter a reason more than 10 and less than 255 characters', 'warning');
			return;
		}
		try {
			const response = await API.dissertationRequests.handlePreliminaryDissertationRequest(
				dissertationRequest.id,
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
				showToast('Disseration request declined successfully', 'success');
			}else{
				showToast(response?.data?.message, 'warning');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setOpen(false);
			previousDialogSetClose();
		}
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				sx={{
					maxHeight: '2.5rem',
					alignSelf: 'center',
					lineHeight: '1rem',
				}}
				variant="text"
				onClick={handleClickOpen}>
				DECLINE
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Decline dissertation request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter the reason for declining the request.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Reason"
						type="text"
						fullWidth
						variant="standard"
						value={declinedReason}
						onChange={(event) => setDeclinedReason(event.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={declineRequest}>Send</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}