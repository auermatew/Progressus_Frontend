// BookLessonModal.tsx
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface LessonSlot {
  id: number;
  start_date: string;
  end_date: string;
  teacherClass: {
    subject: string;
    className: string;
  };
}

interface BookLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lessonId: number) => void;
  teacherName: string;
  lessonSlots: LessonSlot[];
}

const BookLessonModal: React.FC<BookLessonModalProps> = ({ isOpen, onClose, onSubmit, teacherName, lessonSlots }) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(lessonSlots[0]?.id || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLessonId) {
      try {
        await onSubmit(selectedLessonId);
        alert('Óra foglalás sikeresen elküldve!');
        onClose();
      } catch (error) {
        console.error('Hiba történt a foglalás közben:', error);
        alert('Sikertelen foglalás.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-xl bg-[#1A0129] p-6 shadow-2xl text-white relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-400">
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Óra foglalása: {teacherName}</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium">Elérhető időpontok</label>
          <select
            className="rounded-md bg-[#2B0A3D] p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(Number(e.target.value))}
          >
            {lessonSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.start_date).toLocaleString()} - {slot.teacherClass.subject}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700"
          >
            Foglalás elküldése
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookLessonModal;
