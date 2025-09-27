import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// src/utils/toast.js
import { toast } from 'sonner';

/**
 * Show a success toast
 * @param {string} message - The message to display
 * @param {object} options - sonner options
 */
export const showSuccessToast = (message:string, options = {}) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Show an error toast
 * @param {string} message - The message to display
 * @param {object} options - sonner options
 * @param {number} status - HTTP status code (optional)
 */
export const showErrorToast = (message:string, options = {}, status?: number) => {
  // Don't show toast for 502 and 504 errors
  if (status === 502 || status === 504) {
    return;
  }
  
  toast.error(message, {
    duration: 5000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Show a warning toast
 * @param {string} message - The message to display
 * @param {object} options - sonner options
 */
export const showWarningToast = (message:string, options = {}) => {
  toast.warning(message, {
    duration: 4000,
    position: 'top-right',
    ...options,
  });
};

/**
 * Show a loading toast
 * @param {string} message - The message to display
 * @param {object} options - sonner options
 * @returns {string} - The toast ID for later reference
 */
export const showLoadingToast = (message:string, options = {}) => {
  return toast.loading(message, {
    position: 'top-right',
    ...options,
  });
};

/**
 * Update a toast
 * @param {string} id - The toast ID
 * @param {object} config - New toast configuration
 */
export const updateToast = (id:string, config:any) => {
  toast.dismiss(id);
  toast(config.message, {
    id,
    ...config.options,
  });
};

/**
 * Dismiss a toast
 * @param {string} id - The toast ID
 */
export const dismissToast = (id:string) => {
  toast.dismiss(id);
};

/**
 * Dismiss all toasts
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};