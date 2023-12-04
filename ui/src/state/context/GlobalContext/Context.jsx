import {
	createContext,
	useCallback,
	useReducer,
	useEffect,
	useMemo,
} from 'react';
import globalReducer from '../reducers/globalReducer';
import {initialState} from '../../../utils/constants';
import {
	setIsLoggedIn as setLoginAction,
	setIsLoading as setLoadingAction,
	setId as setIdAction,
	setRole as setRoleAction
} from '../../actions/globalActions';
import API from '../../../app/api';

export const Context = createContext({ context: initialState });

const Provider = ({ children }) => {
	const [context, dispatch] = useReducer(globalReducer, initialState);

	const authorize = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			setIsLoggedIn(false);
			return setIsLoading(false);
		}
		try {
			const response = await API.auth.myProfile({
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (response?.data) {
				setRole(response.data.role);
				setId(response.data.id);
				setIsLoggedIn(true);
			}
		} catch (error) {
			localStorage.removeItem('token');
			setIsLoggedIn(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		authorize();
	}, []);

	function setIsLoggedIn(is) {
		dispatch(setLoginAction(is));
	}

	function setRole(role) {
		dispatch(setRoleAction(role));
	}

	function setId(id) {
		dispatch(setIdAction(id));
	}

	function setIsLoading(is) {
		dispatch(setLoadingAction(is));
	}

	const value = useMemo(
		() => ({
			context,
			setIsLoggedIn,
			setRole,
			setId,
			setIsLoading,
			authorize,
		}),
		[context]
	);

	return <Context.Provider value={ value }>{children}</Context.Provider>;
};

export default Provider;
