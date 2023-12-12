import { APP_ROUTES } from './routes';
import DissertationRequestsList from '../pages/DissertationRequestsList';
import NotFound from '../pages/NotFound';
import ProfessorsList from '../pages/ProfessorsList';
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
		path: APP_ROUTES.professorsList,
		element: ProfessorsList,
		roles: [UserRole.STUDENT],
		headTitle: 'Professors List',
		title: 'Professors List',
	},
	{
		path: APP_ROUTES.notFound,
		element: NotFound,
		headTitle: 'Not Found',
	},
];
