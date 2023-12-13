import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import  { useContext, useState } from 'react';
import { Context } from '../state/context/GlobalContext/Context';
import MessageIcon from '@mui/icons-material/Message';
import { UserRole } from '../utils/constants';

export default function ShowStudentMessage({ message }){

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
			<DialogTitle>Message to professor</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message}
				</DialogContentText>
			</DialogContent>
			{role === UserRole.PROFESSOR &&
			<DialogActions>
				<Button onClick={handleClose}>Decline</Button>
				<Button onClick={handleClose}>Approve</Button>
			</DialogActions>}
		</Dialog>
	</>);
}