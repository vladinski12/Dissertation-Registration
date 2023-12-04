import { APP_ROUTES } from './routes';
import NotFound from '../pages/NotFound';
import DissertationRequestsList from '../pages/DissertationRequestsList';
import { UserRole } from '../utils/constants';

export default [
	{
		path: APP_ROUTES.dissertationRequestsList,
		element: DissertationRequestsList,
		roles: [UserRole.PROFESSOR, UserRole.STUDENT],
		headTitle: 'Dissertation Requests List',
		title: 'Dissertation Requests',
	},
	{
		path: APP_ROUTES.notFound,
		element: NotFound,
		headTitle: 'Not Found',
	},
];
