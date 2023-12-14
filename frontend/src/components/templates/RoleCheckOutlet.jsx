import { Navigate,Outlet } from 'react-router-dom';
import { APP_ROUTES } from '../../app/routes.js';
import { Context } from '../../state/context/GlobalContext/Context';
import { useContext } from 'react';

export default function RoleCheckOutlet({ route }){
	const { context: { role: userRole } } = useContext(Context);

	if(!route.roles || route?.roles?.length === 0){
		return <Outlet/>;
	}
	const hasRole = route.roles ? route.roles.some((role) => role === userRole) : false;

	return hasRole ? <Outlet/> : <Navigate
		replace
		to={ APP_ROUTES.notFound }/>;
}