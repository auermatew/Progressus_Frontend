import { useEffect, useMemo, useState } from 'react';
import NavbarSideSt from './NavbarSideSt';
import Footer from '../../components/ui/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './_studentStyle.css';
import api from '../../api/apiService';

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

const StudentCalendar = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get('/api/v1/lesson-reservations/student');
        setReservations(res.data);
      } catch (err) {
        console.error('Hiba a foglalások betöltésekor:', err);
      }
    };

    fetchReservations();
  }, []);

  const reservationsByDate = useMemo(() => {
    const map: Record<string, Reservation[]> = {};
    reservations.forEach((r) => {
      const date = new Date(r.teacherClassLesson.start_date).toDateString();
      if (!map[date]) map[date] = [];
      map[date].push(r);
    });
    return map;
  }, [reservations]);

  const tileClassName = ({ date }: { date: Date }) => {
    const key = date.toDateString();
    return reservationsByDate[key] ? 'bg-purple-700 text-white rounded-full' : '';
  };

  const selectedReservations = selectedDate
    ? reservationsByDate[selectedDate.toDateString()] || []
    : [];

  return (
    <>
      <NavbarSideSt />
      <div className="page-wrapper min-h-screen w-full bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-4 pl-24 font-[Poppins] text-white">
        <h1 className="mb-6 text-4xl font-bold">Naptár</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Naptár */}
          <div className="w-full max-w-xl rounded-xl bg-[#2B0A3D] p-4 shadow-md">
            <Calendar
              onChange={(value) => setSelectedDate(value as Date)}
              value={selectedDate}
              tileClassName={tileClassName}
              calendarType="iso8601"
              className="rounded-lg text-sm text-black"
              next2Label={null}
              prev2Label={null}
              locale="hu-HU"
            />
          </div>

          {/* Foglalások az adott napra */}
          <div className="w-full">
            {selectedReservations.length > 0 ? (
              <ul className="space-y-4">
                {selectedReservations.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-lg bg-[#2B0A3D] p-4 shadow-md transition hover:shadow-lg"
                  >
                    <p className="text-lg font-semibold">
                      {r.teacherClassLesson.teacherClass.subject} –{' '}
                      {r.teacherClassLesson.teacherClass.className}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(r.teacherClassLesson.start_date).toLocaleString()} –{' '}
                      {new Date(r.teacherClassLesson.end_date).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      Tanár: {r.teacherClassLesson.teacherClass.teacher.user.fullName}
                    </p>
                    <span
                      className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        r.status === 'PENDING'
                          ? 'bg-yellow-500 text-black'
                          : r.status === 'APPROVED'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-600 text-white'
                      }`}
                    >
                      {r.status === 'PENDING'
                        ? 'Függőben'
                        : r.status === 'APPROVED'
                          ? 'Elfogadva'
                          : 'Elutasítva'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 text-gray-400 italic">
                {selectedDate ? 'Ezen a napon nincs foglalásod.' : 'Válassz egy napot a naptárból!'}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentCalendar;
