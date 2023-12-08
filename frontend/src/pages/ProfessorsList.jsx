import { Container,Divider, List,ListItem, Stack,Typography } from '@mui/material';
import {Fragment, useContext, useEffect, useState } from 'react';
import API from '../app/api';
import { Context } from '../state/context/GlobalContext/Context';
import CreateRequestButtonDialog from '../components/CreateRequestButtonDialog';
import { formatDate } from '../utils/dateHelpers';
import { showToast } from '../components/templates/ToastMessage';

const ProfessorsList = () => {
	const {
		setIsLoading,
	} = useContext(Context);

	const [professors, setProfessors] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const response = await API.professors.getProfessors(
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				if (response?.data) {
					setProfessors(response.data);
				}
			} catch (error) {
				showToast(error?.response?.data?.message, 'error');
			} finally {
				setIsLoading(false);
			}
		})();
	},[]);

	return (
		<Container>
			<Typography variant='h5'>Professors List</Typography>
			<List >
				{professors.map((professor) => {
					const availableUntil= professor.RegistrationSessions.find((registrationSession) => new Date(registrationSession.startDate) < Date.now() && new Date(registrationSession.endDate) > Date.now() )?.endDate;
					return(
						<Fragment key={professor.id}>
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
										{professor.user.name}
									</Typography>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary">
										{professor.user.email}
									</Typography>
									<Typography
										sx={{ display: 'inline' }}
										component="span"
										variant="body2"
										color="text.primary">
										Available until: {formatDate(availableUntil)}
									</Typography>
								</ListItem>
								<CreateRequestButtonDialog
									professorId={professor.id}
									setIsLoading={setIsLoading}/>
							</Stack>
							<Divider
								sx={{
									m: 2,
									alignSelf: 'center',
								}}
								variant="inset"
								component="li"/>
						</Fragment>
					);})	
				}
			</List>
		</Container>
	);
};

export default ProfessorsList;