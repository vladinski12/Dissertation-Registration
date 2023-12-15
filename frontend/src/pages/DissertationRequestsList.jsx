/* eslint-disable react-refresh/only-export-components */
import { Chip, Container, Divider,  List, ListItem, Stack, Typography } from '@mui/material';
import { DissertationRequestStatus, MAX_NUMBER_OF_APPROVED_REQUESTS, UserRole } from '../utils/constants';
import DissertationRequestsProvider, { DissertationRequestsContext } from '../state/context/DissertationRequestsContext/DissertationRequestsContext';
import { Fragment, useContext, useEffect } from 'react';
import { Context } from '../state/context/GlobalContext/Context';
import HandlePreliminaryRequestButtonDialog from '../components/HandlePreliminaryRequestButtonDialog';
import Loading from '../components/templates/Loading';
import { formatDate } from '../utils/dateHelpers';
import withProviders from '../state/hooks/withProviders';

const DissertationRequestsList = ()=> {
	const {
		context: { role },
	} = useContext(Context);
	const { isLoadingDissertationRequests, dissertationRequests, getDissertationRequests } = useContext(DissertationRequestsContext);

	useEffect(() => {
		getDissertationRequests();
	}, []);

	const renderStatus = (status) => {
		switch (status) {
			case DissertationRequestStatus.PENDING_APPROVAL:
				return <Chip
					sx={{
						my: 1,
					}}
					color='warning'
					label='PENDING APPROVAL'/>;
			case DissertationRequestStatus.APPROVED:
				return <Chip
					sx={{
						my: 1,
					}}
					color='success'
					label="APPROVED"/>;
			case DissertationRequestStatus.DECLINED:
				return <Chip
					sx={{
						my: 1,
					}}
					color='error'
					label="DECLINED"/>;
			default:
				return <Chip
					color='default'
					label={ status }/>;
		}

	};

	if (isLoadingDissertationRequests) return <Loading/>;
	else return (
		<Container
			sx={{
				my: 5,
			}}>
			<Typography variant='h4'>Requests List</Typography>
			<Typography variant='h6'>
				Number of approved dissertation requests {dissertationRequests.filter((dissertationRequest) => dissertationRequest.status === DissertationRequestStatus.APPROVED).length} (out of {MAX_NUMBER_OF_APPROVED_REQUESTS})
			</Typography>
			<List>
				{dissertationRequests.map((dissertationRequest) => {
					return(
						<Fragment key={ dissertationRequest.id }>
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
									{renderStatus(dissertationRequest.status)}
									<Typography>
										{role === UserRole.PROFESSOR ?
											`From ${dissertationRequest.student.user.name} (${dissertationRequest.student.user.email})` :
											`To ${dissertationRequest.professor.user.name} (${dissertationRequest.professor.user.email})`
										}
									</Typography>
									<Typography>
										Created at {formatDate(dissertationRequest.createdAt)}
									</Typography>
								</ListItem>
								<HandlePreliminaryRequestButtonDialog
									dissertationRequest={ dissertationRequest }/>
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

export default withProviders([DissertationRequestsProvider])(DissertationRequestsList);