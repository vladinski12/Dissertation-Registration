import { Chip, Tooltip, } from '@mui/material';
import { DissertationRequestStatus, } from '../utils/constants';

const ApprovedDissertationRequestStatusChip = ({
	status,
	withTooltips = true,
	tooltipDirection = 'right',
}) => {
	switch (status) {
		case DissertationRequestStatus.APPROVED: {
			const chip = <Chip
				sx={{ my: 1, }}
				color='warning'
				label='APPROVED'/>;

			return withTooltips ? (
				<Tooltip
					title='The student has to upload the dissertation file.'
					placement='right'
				>
					{chip}
				</Tooltip>
			) : (
				chip
			);
		}
		case DissertationRequestStatus.APPROVED_REJECTED:{
			const chip = <Chip
				sx={{
					my: 1,
				}}
				color='error'
				label='APPROVED REJECTED'
			/>;
			return withTooltips ? (
				<Tooltip
					title='The student has to upload the dissertation file.'
					placement={ tooltipDirection }
				>
					{chip}
				</Tooltip>
			) : (
				chip
			);
		}
		case DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT:{
			const chip = <Chip
				sx={{
					my: 1,
				}}
				color='info'
				label='FILE UPLOADED BY STUDENT'
			/>;
			return withTooltips ? (
				<Tooltip
					title='The professor has to upload the dissertation file.'
					placement={ tooltipDirection }
				>
					{chip}
				</Tooltip>
			) : (
				chip
			);
		}

		case DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR:
			return (
				<Chip
					sx={{
						my: 1,
					}}
					color='success'
					label='FILE UPLOADED BY PROFESSOR'
				/>
			);
		default:
			return <Chip
				color='default'
				label={ status }/>;
	}
};

export default ApprovedDissertationRequestStatusChip;
