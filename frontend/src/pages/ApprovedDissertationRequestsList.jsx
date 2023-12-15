/* eslint-disable react-refresh/only-export-components */
import ApprovedDissertationRequestsProvider, { ApprovedDissertationRequestsContext }from '../state/context/ApprovedDissertationRequestsContext/ApprovedDissertationRequestsContext';
import { Chip, Container, Divider, List, ListItem, Stack, Tooltip, Typography } from '@mui/material';
import { Fragment, useContext, useEffect } from 'react';
import { DissertationRequestStatus } from '../utils/constants';
import { formatDate } from '../utils/dateHelpers';
import withProviders from '../state/hooks/withProviders';

const ApprovedDissertationRequestsList = () => {
	const { approvedDissertationRequests, getApprovedDissertationRequests } = useContext(ApprovedDissertationRequestsContext);

	useEffect(() => {getApprovedDissertationRequests();}, []);

	const renderStatus = (status) => {
		switch (status) {
			case DissertationRequestStatus.APPROVED:
				return <Tooltip
					title="The student has to upload the dissertation file."
					placement="right">
					<Chip
						sx={{
							my: 1,
						}}
						color='warning'
						label='APPROVED'/>
				</Tooltip>;
			case DissertationRequestStatus.APPROVED_REJECTED:
				return <Chip
					sx={{
						my: 1,
					}}
					color='error'
					label="APPROVED"/>;
			case DissertationRequestStatus.FILE_UPLOADED_BY_STUDENT:
				return <Chip
					sx={{
						my: 1,
					}}
					color='info'
					label="FILE UPLOADED BY STUDENT"/>;
			case DissertationRequestStatus.FILE_UPLOADED_BY_PROFESSOR:
				return <Chip
					sx={{
						my: 1,
					}}
					color='success'
					label="FILE UPLOADED BY PROFESSOR"/>;
			default:
				return <Chip
					color='default'
					label={ status }/>;
		}
	};

	return (
		<Container
			sx={{
				my: 5,
			}}>
			<Typography variant='h4'>Approved Requests List</Typography>
			<List>
				{approvedDissertationRequests.map((approvedDissertationRequest) => {
					return(
						<Fragment key={ approvedDissertationRequest.id }>
							<Stack
								direction="row"
								spacing={ 3 }>
								<ListItem
									alignItems="flex-start"
									sx={{
										display: 'flex',
										flexDirection: 'column',
										m: 2,
									}}>
									{renderStatus(approvedDissertationRequest.status)}
									<Typography>
										From {approvedDissertationRequest.student.user.name} ({approvedDissertationRequest.student.user.email})
									</Typography>
									<Typography>
										Created at {formatDate(approvedDissertationRequest.createdAt)}
									</Typography>
								</ListItem>
							</Stack>
							<Divider
								sx={{
									m: 2,
									alignSelf: 'center',
								}}
								variant="inset"
								component="li"/>
						</Fragment>
					);
				})}
			</List>
		</Container>
	);
};

export default withProviders(ApprovedDissertationRequestsProvider)(ApprovedDissertationRequestsList);