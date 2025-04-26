import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LessonApiService } from '../api/LessonApiService';

const TeacherRequests = () => {
  interface PendingReservation {
    reservationId: number;
    studentName: string;
    subject: string;
    startDate: string;
    endDate: string;
  }

  const { user } = useAuth();
  const [pendingReservations, setPendingReservations] = useState<PendingReservation[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchPendingReservations();
    }
  }, [user?.id]);

  const fetchPendingReservations = async () => {
    try {
      const lessons = await LessonApiService.getLessonsForTeacher(user!.id);

      const pending = lessons.flatMap((lesson) =>
        lesson.lessonReservations?.filter((res) => res.status === 'PENDING').map((res) => ({
          reservationId: res.id,
          studentName: res.user.fullName,
          subject: lesson.teacherClass.subjects.join(', '),
          startDate: lesson.startDate,
          endDate: lesson.endDate,
        }))
      );

      setPendingReservations(pending);
    } catch (error) {
      console.error('Error loading teacher reservations:', error);
    }
  };

  const handleDecision = async (reservationId: number, accepted: boolean) => {
    try {
      await LessonApiService.handleReservation(reservationId, accepted);
      await fetchPendingReservations(); // újra betölti a listát
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Függőben lévő órakérések</h2>

      {pendingReservations.length === 0 ? (
        <p className="text-gray-400">Nincsenek függőben lévő kérések.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-4">
            {pendingReservations.map((r) => (
              <div
                key={r.reservationId}
                className="min-w-[280px] max-w-[300px] flex-shrink-0 rounded-lg bg-[#2B0A3D] p-4 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold mb-1">{r.studentName}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(r.startDate).toLocaleString()} - {new Date(r.endDate).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-400 mb-2">Tantárgy: {r.subject}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(r.reservationId, true)}
                    className="w-1/2 rounded-md bg-green-600 py-2 text-sm font-semibold hover:bg-green-700"
                  >
                    Elfogadás
                  </button>
                  <button
                    onClick={() => handleDecision(r.reservationId, false)}
                    className="w-1/2 rounded-md bg-red-600 py-2 text-sm font-semibold hover:bg-red-700"
                  >
                    Elutasítás
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;
