// components/popups/BookingPopup.tsx
import React, { useEffect } from 'react';

interface BookingPopupProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const BookingPopup: React.FC<BookingPopupProps> = ({ message, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="animate-fade-in-out fixed right-6 bottom-6 z-50 rounded-lg bg-green-600 px-6 py-3 text-white shadow-lg transition-opacity">
      {message}
    </div>
  );
};

export default BookingPopup;
