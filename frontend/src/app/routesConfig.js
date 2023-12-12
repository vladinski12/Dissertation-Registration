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
		headTitle: 'Requests - List',
		title: 'Requests',
	},
	{
		path: APP_ROUTES.professorsList,
		element: ProfessorsList,
		roles: [UserRole.STUDENT],
		headTitle: 'Professors',
		title: 'Professors',
	},
	{
		path: APP_ROUTES.notFound,
		element: NotFound,
		headTitle: 'Not Found',
	},
];
