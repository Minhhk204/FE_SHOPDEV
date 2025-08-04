import { toast } from "react-toastify";

// Hiển thị thông báo thành công
export const showSuccessToast = (message: string) => {
  toast.success(message);
};

// Hiển thị thông báo lỗi
export const showErrorToast = (message: string) => {
  toast.error(message);
};

// Hiển thị cảnh báo
export const showWarningToast = (message: string) => {
  toast.warning(message);
};

// Thông báo thông thường (info)
export const showInfoToast = (message: string) => {
  toast.info(message);
};
