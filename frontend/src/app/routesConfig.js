import { APP_ROUTES } from './routes';
import ApprovedDissertationRequestsList from '../pages/ApprovedDissertationRequestsList';
import DissertationRequestsList from '../pages/DissertationRequestsList';
import NotFound from '../pages/NotFound';
import ProfessorsList from '../pages/ProfessorsList';
import { UserRole } from '../utils/constants';
import UploadDissertationRequest from '../pages/UploadDissertationRequest';

// for professors:
// - prelimnary dissertation requests list (with the option to accept or reject with a reason a request)
// - final dissertation requests list (with the option to accept with upload of file or reject with a reason a request)
// - screen to create registration session

// for students:
// - list of preliminary dissertation requests (with the option to see the message)
// - list of professors (with the option to send a request to a professor)
// - screen to upload dissertation request

export default [
	{
		path: APP_ROUTES.dissertationRequestsList,
		element: DissertationRequestsList,
		roles: [UserRole.PROFESSOR, UserRole.STUDENT],
		headTitle: 'Requests',
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
		path: APP_ROUTES.approvedDissertationRequestsList,
		element: ApprovedDissertationRequestsList,
		roles: [UserRole.PROFESSOR],
		headTitle: 'Approved Requests',
		title: 'Approved Requests',
	},
	{
		path: APP_ROUTES.uploadDissertationRequest,
		element: UploadDissertationRequest,
		roles: [UserRole.STUDENT],
		headTitle: 'Upload Request',
		title: 'Upload Request',
	},
	{
		path: APP_ROUTES.notFound,
		element: NotFound,
		headTitle: 'Not Found',
	},
];
