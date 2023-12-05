import { useContext, useState, useEffect } from 'react';
import { Context } from '../state/context/GlobalContext/Context';
import { Container, Typography } from '@mui/material';
import API from '../app/api';
import { showToast } from '../components/templates/ToastMessage';

export default function DissertationRequestsList() {
	const {
		context: { role },
		setIsLoading,
	} = useContext(Context);

	const [dissertationRequestsList, setDissertationRequestsList] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
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
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<Container>
			<Typography variant='h5'>Dissertation Requests List</Typography>
			<Typography variant='h6'>Role: {role}</Typography>
			<Typography variant='h6'>
				Number of dissertation requests: {dissertationRequestsList.length}
			</Typography>
		</Container>
	);
}
