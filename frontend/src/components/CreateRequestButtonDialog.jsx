import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,TextField} from '@mui/material';
import API from '../app/api';
import SendIcon from '@mui/icons-material/Send';
import {showToast} from './templates/ToastMessage';
import {useState} from 'react';

const CreateRequestButtonDialog = ({professorId,setIsLoading}) => {
	const [open, setOpen] = useState(false);
	const [studentMessage, setStudentMessage] = useState('');

	const createRequest = async () => {
		try {
			setIsLoading(true);
			const response = await API.dissertationRequests.createDissertationRequest(
				{
					professorId,
					studentMessage,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response.status === 200) {
				showToast('Disseration request created successfully', 'success');
			}else{
				showToast(response?.data?.message, 'warning');
			}
		} catch (error) {
			showToast(error?.response?.data?.message, 'error');
		}finally{
			setIsLoading(false);
			setOpen(false);
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
				variant="contained"
				endIcon={<SendIcon/>}
				onClick={handleClickOpen}>
				Send request
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Send dissertation request</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Send a request to the professor to be your dissertation coordinator.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Message"
						type="text"
						fullWidth
						variant="standard"
						value={studentMessage}
						onChange={(event) => setStudentMessage(event.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={createRequest}>Send</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default CreateRequestButtonDialog;