import React, { useEffect, useState } from 'react';

interface BookingPopupProps {
  message: string;
  visible: boolean;
  onClose: () => void;
}

const BookingPopup: React.FC<BookingPopupProps> = ({ message, visible, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center">
      <div className="rounded-lg bg-purple-600 px-6 py-3 shadow-lg transition-all animate-fade-in-out">
        <p className="text-white font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default BookingPopup;
