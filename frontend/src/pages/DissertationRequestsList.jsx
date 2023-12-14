import {  Container,Divider,  List,ListItem,Stack,Typography } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import API from '../app/api';
import { Context } from '../state/context/GlobalContext/Context';
import StudentMessageDialog from '../components/StudentMessageDialog';
import { UserRole } from '../utils/constants';
import { formatDate } from '../utils/dateHelpers';
import { showToast } from '../components/templates/ToastMessage';

export default function DissertationRequestsList() {
	const {
		context: { role },
	} = useContext(Context);

	const [dissertationRequestsList, setDissertationRequestsList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await API.dissertationRequests.getDissertationRequests(
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				if (response?.data) {
					setDissertationRequestsList(response.data);
				}
			} catch (error) {
				showToast(error?.response?.data?.message, 'error');
			}
		})();
	},[]);

	return (
		<Container
			sx={{
				my: 5,
			}}>
			<Typography variant='h4'>Requests List</Typography>
			<Typography variant='h6'>
				Number of dissertation requests: {dissertationRequestsList.length}
			</Typography>
			<List>
				{dissertationRequestsList.map((dissertationRequest) => {
					return(
						<Fragment key={dissertationRequest.id}>
							<Stack
								direction="row"
								spacing={3}>
								<ListItem
									alignItems="flex-start"
									sx={{
										display: 'flex',
										flexDirection: 'column',
										m: 2,
									}}>
									<Typography>
										{role === UserRole.PROFESSOR ? `From : ${dissertationRequest.student.user.name}` : `To: ${dissertationRequest.professor.user.name}`}
									</Typography>
									<Typography>
										Status:	{dissertationRequest.status.replace('_', ' ')}
									</Typography>
									<Typography>
										Created at: {formatDate(dissertationRequest.createdAt)}
									</Typography>
								</ListItem>
								<StudentMessageDialog
									dissertationRequest={dissertationRequest}/>
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
}
