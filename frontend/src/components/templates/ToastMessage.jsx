import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, } from 'react-toastify';
import { useEffect, } from 'react';

const toastConfig = {
	position: 'bottom-left',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	draggable: true,
};

// eslint-disable-next-line react-refresh/only-export-components
export const showToast = (message, type) => {
	if(message.length > 0){
		switch (type) {
			case 'success':
				toast.success(message, { ...toastConfig, });
				break;
			case 'warning':
				toast.warn(message,  { ...toastConfig, });
				break;
			case 'error':
				toast.error(message,  { ...toastConfig, });
				break;
			default:
				break;
		}
	}
};

const ToastMessage = ({ message, type, }) => {
	useEffect(() => {
		showToast(message, type);
	}, [message, type]);

	return <ToastContainer/>;
};

export default ToastMessage;