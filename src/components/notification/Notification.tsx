import React, { useEffect } from 'react';
import './notification.css';
import RemoveIcon from '../../../public/assets/close.svg';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-button" onClick={onClose}><RemoveIcon/></button>
    </div>
  );
};

export default Notification;
