import { toast, ToastOptions, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastIds: Record<string, Id> = {};

const showToast = (message: string, type: string, containerId: string = 'default') => {
    const toastConfig: ToastOptions = {
        position: 'top-right',
        autoClose: 3000, // Close the message after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'custom-toast-container',
        style: { fontFamily: 'Inter', zIndex: 9999999999999, marginTop: 40, whiteSpace: 'normal' },
        containerId: containerId,
    };


    if (toastIds[type]) {
        toast.dismiss(toastIds[type]);
    }
    toast.dismiss();

    switch (type) {
        case 'success':
            toast.success(message, toastConfig);
            break;
        case 'error':
            toast.error(message, toastConfig);
            break;
        case 'warning':
            toast.warning(message, toastConfig);
            break;
        default:
            toast.info(message, toastConfig);
    }
};

export default showToast;