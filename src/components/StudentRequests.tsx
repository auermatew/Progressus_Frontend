import { useEffect, useState } from 'react';
import api from '../api/apiService';
import { useAuth } from '../contexts/AuthContext';

interface StudentReservation {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  teacherClassLesson: {
    startDate: string;
    endDate: string;
    teacherClass: {
      title: string;
      subjects: string[];
    };
    teacher: {
      user: {
        fullName: string;
      };
    };
  };
}

const StudentRequests = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<StudentReservation[]>([]);

  useEffect(() => {
    if (user) {
      fetchReservations();
    }
  }, [user]);

  const fetchReservations = async () => {
    try {
      const res = await api.get('/api/v1/lesson-reservations/student');
      setReservations(res.data);
    } catch (error) {
      console.error('Error fetching student reservations:', error);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Lefoglalt óráim</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-400">Még nincs foglalásod.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap gap-4">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="max-w-[300px] min-w-[280px] flex-shrink-0 rounded-lg bg-[#2B0A3D] p-4 shadow-md transition hover:shadow-lg"
              >
                <h3 className="mb-1 text-lg font-bold">
                  {r.teacherClassLesson.teacher.user.fullName}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(r.teacherClassLesson.startDate).toLocaleString()} -{' '}
                  {new Date(r.teacherClassLesson.endDate).toLocaleTimeString()}
                </p>
                <p className="mb-2 text-sm text-gray-400">
                  Tantárgy: {r.teacherClassLesson.teacherClass.subjects.join(', ')}
                </p>
                <div className="mt-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      r.status === 'PENDING'
                        ? 'bg-yellow-500 text-black'
                        : r.status === 'APPROVED'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                    }`}
                  >
                    {r.status === 'PENDING'
                      ? 'Függőben'
                      : r.status === 'APPROVED'
                        ? 'Elfogadva'
                        : 'Elutasítva'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRequests;
