import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, } from '@mui/material';
import  { useCallback, useContext, useState, } from 'react';
import { ApprovedDissertationRequestsContext, } from '../state/context/ApprovedDissertationRequestsContext/ApprovedDissertationRequestsContext';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

	const handleOpenFileClick = useCallback((location)=>()=>{
		window.open(`${import.meta.env.VITE_PDF_STORAGE_URL}${dissertationRequest[location].filename}`, '_blank');
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
			<DialogContent
				sx={
					{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '4rem',
					}
				}>
				<Button
					component='label'
					variant='contained'
					startIcon={ <CloudUploadIcon/> }
					onClick={ handleOpenFileClick('studentFile') }
				>Student File</Button>
			</DialogContent>
			<DialogActions>
				<Button onClick={ handleDecline }>Decline</Button>
				<UploadRequestButtonDialog dissertationRequest={ dissertationRequest }/>
			</DialogActions>
		</Dialog>
	</>);
}