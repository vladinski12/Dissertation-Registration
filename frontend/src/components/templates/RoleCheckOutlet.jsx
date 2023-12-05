import { useContext } from 'react';
import { Outlet,Navigate } from 'react-router-dom';
import { Context } from '../../state/context/GlobalContext/Context';
import { APP_ROUTES } from '../../app/routes.js';

export default function RoleCheckOutlet({route}){
	const {context: {role: userRole}}=useContext(Context);

	if(!route.roles || route?.roles?.length===0){
		return <Outlet/>;
	}
	//  const hasRole = route.roles ? route.roles.some((role) => role === userRole) : false;

	const hasRole=route?.roles?.some((role)=>role===userRole);

	return hasRole?<Outlet/>:<Navigate
		replace
		to={ APP_ROUTES.notFound }/>;
}