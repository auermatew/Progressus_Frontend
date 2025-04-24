import { useEffect, useState } from 'react';
import api from '../api/apiService';

interface Reservation {
  id: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  teacherClassLesson: {
    start_date: string;
    end_date: string;
    teacherClass: {
      subject: string;
      className: string;
      teacher: {
        user: {
          fullName: string;
        };
      };
    };
  };
}

const StudentRequests = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchReservations = async () => {
    try {
      const res = await api.get('/api/v1/lesson-reservations/student');
      setReservations(res.data);
    } catch (err) {
      console.error('Hiba a foglalások lekérésekor:', err);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Foglalásaid</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-400">Nincs foglalásod jelenleg.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-4 flex-nowrap">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="min-w-[280px] max-w-[300px] flex-shrink-0 rounded-lg bg-[#2B0A3D] p-4 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold mb-1">
                  {r.teacherClassLesson.teacherClass.teacher.user.fullName}
                </h3>
                <p className="text-sm text-gray-300">
                  {new Date(r.teacherClassLesson.start_date).toLocaleString()} –{' '}
                  {new Date(r.teacherClassLesson.end_date).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-400">
                  Tantárgy: <span className="text-white">{r.teacherClassLesson.teacherClass.subject}</span>{' '}
                  | Osztály: <span className="text-white">{r.teacherClassLesson.teacherClass.className}</span>
                </p>
                <div className="mt-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      r.status === 'PENDING'
                        ? 'bg-yellow-500 text-black'
                        : r.status === 'APPROVED'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-600 text-white'
                    }`}
                  >
                    {r.status === 'PENDING' ? 'Függőben' : r.status === 'APPROVED' ? 'Elfogadva' : 'Elutasítva'}
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
