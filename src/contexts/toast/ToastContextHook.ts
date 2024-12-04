import { useContext } from 'react';
import ToastContext from './ToastProvider';

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      'useToastContext must be used within a ToastContextProvider'
    );
  }
  return context;
};
