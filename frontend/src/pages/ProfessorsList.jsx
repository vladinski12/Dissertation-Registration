import { Container, Divider, List, ListItem, Stack, Typography, } from '@mui/material';
import { Fragment,  useEffect, useState, } from 'react';
import API from '../app/api';
import CreateRequestButtonDialog from '../components/CreateRequestButtonDialog';
import { formatDate, } from '../utils/dateHelpers';
import { showToast, } from '../components/templates/ToastMessage';

const ProfessorsList = () => {
	const [professors, setProfessors] = useState([]);

	useEffect(() => {
		(async () => {
			try {
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
				showToast(error?.response?.data?.message || error?.message, 'error');
			}
		})();
	}, []);

	return (
		<Container
			sx={
				{ my: 5, }
			}
		>
			<Typography variant='h4'>Professors List</Typography>
			<Typography variant='h6'>Number of professors available: {professors.length}</Typography>
			<List >
				{professors.map((professor) => {
					const availableUntil = professor.RegistrationSessions.find((registrationSession) => new Date(registrationSession.startDate) < Date.now() && new Date(registrationSession.endDate) > Date.now() )?.endDate;
					return(
						<Fragment key={ professor.id }>
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
									<Typography>
										{professor.user.name}
									</Typography>
									<Typography
										sx={{ display: 'inline', }}
										component="span"
										variant="body2"
										color="text.primary">
										{professor.user.email}
									</Typography>
									<Typography
										sx={{ display: 'inline', }}
										component="span"
										variant="body2"
										color="text.primary">
										Available until: {formatDate(availableUntil)}
									</Typography>
								</ListItem>
								<CreateRequestButtonDialog
									professor={ professor }
								/>
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