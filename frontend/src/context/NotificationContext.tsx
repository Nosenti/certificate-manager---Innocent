// src/context/NotificationContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Notification from '../components/notification/Notification';

interface NotificationContextProps {
  notify: (message: string, type: 'success' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<
    { message: string; type: 'success' | 'error'; id: number }[]
  >([]);

  const notify = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { message, type, id }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
