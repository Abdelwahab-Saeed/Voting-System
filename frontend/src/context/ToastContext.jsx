import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'primary') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    }, []);

    const hideToast = useCallback(() => setToast(null), []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1100 }}>
                    <div className={`toast show align-items-center text-bg-${toast.type} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                {toast.message}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={hideToast} aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
