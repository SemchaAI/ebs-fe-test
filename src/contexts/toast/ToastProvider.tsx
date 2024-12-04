import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import css from './toastProvider.module.scss';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: number;
  message: string;
  type?: ToastType;
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType, duration?: number) => void;
  //removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  let AICounter = 1;
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id = AICounter++;
      setToasts((prev) => [...prev, { id, message, type }]);

      const timer = setTimeout(() => removeToast(id), duration);
      setTimers((prev) => [...prev, timer]);
    },
    []
  );
  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [timers]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
      }}
    >
      {children}
      <div className={css.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${css.toast} ${css[toast.type || 'info']}`}
          >
            {toast.message}
            <X onClick={() => removeToast(toast.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
