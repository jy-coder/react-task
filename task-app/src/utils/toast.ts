import { toast } from 'react-toastify';

function showSuccessToast(message: string, toastId: string) {
  toast.success(message, {
    toastId: toastId,
    autoClose: 1000
  });
}

export { showSuccessToast };
