import {toast, ToastOptions} from "react-toastify";

const toastConfig: ToastOptions = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light'
};

export const toastInfo = (message: string) => toast.info(message, toastConfig);

export const toastSuccess = (message: string) => toast.success(message, toastConfig);

export const toastWarning = (message: string) => toast.warn(message, toastConfig);

export const toastError = (message: string) => toast.error(message, toastConfig);