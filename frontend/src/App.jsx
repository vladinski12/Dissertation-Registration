import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import React, { useContext } from 'react';
import { APP_ROUTES } from './app/routes';
import { Box } from '@mui/material';
import { Context } from './state/context/GlobalContext/Context';
import { Helmet } from 'react-helmet-async';
import Loading from './components/templates/Loading';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import RoleCheckOutlet from './components/templates/RoleCheckOutlet';
import map from 'lodash/map';
import routes from './app/routesConfig';

function ProtectedRoutes() {
	return (
		<>
			<Navbar/>
			<Routes>
				{map(routes, (route, idx) => (
					<Route
						key={`app-route-${idx}`}
						element={<RoleCheckOutlet route={route}/>}
					>
						<Route
							{...route}
							element={
								<React.Fragment>
									<Helmet defer={false}>
										<title>{route?.headTitle}</title>
									</Helmet>
									<route.element {...route}/>
								</React.Fragment>
							}
						/>
					</Route>
				))}
			</Routes>
		</>
	);
}

function App() {
	const {
		context: { isLoggedIn, isLoading },
	} = useContext(Context);

	function loadingHandler(next, fallback) {
		if (isLoading) {
			return <Loading/>;
		}
		if (isLoggedIn) {
			return next;
		}
		return fallback;
	}

	return (
		<Box
			component='div'
			sx={{
				width: '100vw',
			}}
		>
			<Router>
				<Routes>
					<Route
						path='/'
						element={loadingHandler(
							<Navigate
								to={APP_ROUTES.dissertationRequestsList}
								replace/>,
							<Login/>
						)}
					/>
					<Route
						path='/*'
						element={loadingHandler(
							<ProtectedRoutes/>,
							<Navigate
								to='/'
								replace/>
						)}
					/>
				</Routes>
			</Router>
		</Box>
	);
}

export default App;
