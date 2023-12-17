import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, } from '@mui/material';
import {  useCallback, useState, } from 'react';
import API from '../app/api';
import SendIcon from '@mui/icons-material/Send';
import { showToast, } from './templates/ToastMessage';

const CreateRequestButtonDialog = ({ professor, }) => {
	const [open, setOpen] = useState(false);
	const [studentMessage, setStudentMessage] = useState('');

	const createRequest = useCallback(async () => {
		if (!studentMessage.trim() || studentMessage.trim().length < 10 || studentMessage.trim().length > 255) {
			showToast('Please enter a message more than 10 and less than 255 characters', 'warning');
			return;
		}
		try {
			const response = await API.dissertationRequests.createDissertationRequest(
				{
					professorId: professor.id,
					studentMessage: studentMessage.trim(),
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response.status === 200) {
				showToast('Dissertation request created successfully', 'success');
			}else{
				showToast(response?.data?.message, 'warning');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setOpen(false);
		}
	}, []);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleStudentMessageChange = useCallback((event) => {
		setStudentMessage(event.target.value);
	}, []);

	return (
		<>
			<Button
				sx={{
					maxHeight: '2.5rem',
					alignSelf: 'center',
					lineHeight: '1rem',
				}}
				variant="contained"
				endIcon={ <SendIcon/> }
				onClick={ handleClickOpen }>
				Send request
			</Button>
			<Dialog
				open={ open }
				onClose={ handleClose }>
				<DialogTitle>Send dissertation request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Send a request to {professor.user.name ?? 'professor'} to be your dissertation coordinator.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Message"
						type="text"
						fullWidth
						variant="standard"
						value={ studentMessage }
						onChange={ handleStudentMessageChange }
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={ handleClose }>Cancel</Button>
					<Button onClick={ createRequest }>Send</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CreateRequestButtonDialog;