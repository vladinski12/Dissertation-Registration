import { useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	draggable: true,
};

export const showToast = (message,type) => {
	if(message.length>0){
		switch (type) {
			case 'success':
				toast.success(message, {...toastConfig});
				break;
			case 'error':
				toast.error(message,  {...toastConfig});
				break;
			default:
				break;
		}
	}
};

const ToastMessage = ({message,type}) => {
	useEffect(() => {
		showToast(message,type);
	}, [message,type]);

	return <ToastContainer/>;
};

export default ToastMessage;