import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/apiService';

interface Reservation {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  user: {
    fullName: string;
  };
}

interface Lesson {
  id: number;
  start_date: string;
  end_date: string;
  teacherClass: {
    subject: string;
    className: string;
  };
  lessonReservations: Reservation[];
}

const TeacherRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Lesson[]>([]);

  const fetchLessons = async () => {
    try {
      const res = await api.get(`/api/v1/teacher-class-lessons/teacher/${user?.id}`);
      const data = res.data;

      const lessonsWithPending = data.filter((lesson: Lesson) =>
        lesson.lessonReservations?.some((r) => r.status === 'PENDING')
      );
      setRequests(lessonsWithPending);
    } catch (err) {
      console.error('Error loading teacher lessons:', err);
    }
  };

  const handleReservation = async (reservationId: number, accepted: boolean) => {
    try {
      await api.post(`/api/v1/teacher-class-lessons/reservation/${reservationId}/${accepted}`);
      await fetchLessons();
    } catch (err) {
      console.error('Error updating reservation status:', err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchLessons();
    }
  }, [user?.id]);

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Függőben lévő órakérések</h2>
      {requests.length === 0 ? (
        <p className="text-gray-400">Jelenleg nincsenek függőben lévő kérések.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-4">
            {requests.map((lesson) =>
              lesson.lessonReservations
                .filter((r) => r.status === 'PENDING')
                .map((r) => (
                  <div
                    key={r.id}
                    className="max-w-[300px] min-w-[280px] flex-shrink-0 rounded-lg bg-[#2B0A3D] p-4 shadow-lg transition hover:shadow-xl"
                  >
                    <h3 className="mb-1 text-lg font-bold">{r.user.fullName}</h3>
                    <p className="text-sm text-gray-300">
                      {new Date(lesson.start_date).toLocaleString()} –{' '}
                      {new Date(lesson.end_date).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Tantárgy: <span className="text-white">{lesson.teacherClass.subject}</span> |
                      Osztály: <span className="text-white">{lesson.teacherClass.className}</span>
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleReservation(r.id, true)}
                        className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold hover:bg-green-700"
                      >
                        Elfogadás
                      </button>
                      <button
                        onClick={() => handleReservation(r.id, false)}
                        className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-700"
                      >
                        Elutasítás
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherRequests;
