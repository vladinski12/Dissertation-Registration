import { Context } from '../context/GlobalContext/Context';
import { useContext } from 'react';

export default function useAuth() {
	const { setIsLoggedIn, setId, setRole, authorize } = useContext(Context);

	function setToken(token) {
		localStorage.setItem('token', token);
		authorize?.();
	}

	function logout() {
		localStorage.removeItem('token');
		setIsLoggedIn?.(false);
		setId?.('');
		setRole?.(null);
	}

	return {
		setToken,
		logout,
	};
}
