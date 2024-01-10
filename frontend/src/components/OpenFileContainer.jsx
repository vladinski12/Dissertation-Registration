import { DissertationRequestStatus, UserRole, } from '../utils/constants';
import DownloadIcon from '@mui/icons-material/Download';
import { Paper, } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useCallback, } from 'react';

const OpenFileContainer = ({ dissertationRequest, role, }) => {
	const handleOpenFileClick = useCallback((location)=>()=>{
		window.open(`${import.meta.env.VITE_PDF_STORAGE_URL}${dissertationRequest[location].filename}`, '_blank');
	}, []);

	const generateDownloadIcon = (fileType, onClickHandler) => (
		<DownloadIcon
			sx={{
				fontSize: '10rem',
				margin: '2rem',
				color: 'primary.main',
				cursor: 'pointer',
			}}
			onClick={ onClickHandler(fileType) }
		/>
	);

	const renderDownloadArea = () => {
		let icon = <PictureAsPdfIcon
			sx={{
				fontSize: '10rem',
				margin: '2rem',
				color: 'primary.main',
			}}
		/>;
		if (role === UserRole.STUDENT && (dissertationRequest.status === DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT || dissertationRequest.status === DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR)) {
			icon = generateDownloadIcon(
				dissertationRequest.status === DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT
					? 'studentFile'
					: 'professorFile',
				handleOpenFileClick
			);
		}
		return icon;
	};

	return 	<Paper
		sx={{
			borderRadius: '50%',
			':hover': {
				boxShadow: '0 0 0 0.5rem rgba(0, 123, 255, .5)',
				transform: 'scale(1.05)',
				transition: 'transform .5s',
			},
		}}
		square={ false }
		elevation={ 24 }
	>
		{renderDownloadArea()}
	</Paper>;

};

export default OpenFileContainer;