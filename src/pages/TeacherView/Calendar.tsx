import { useEffect, useMemo, useState } from 'react';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import { useLesson } from '../../contexts/LessonContext';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './_teacherStyle.css';

const Calendar = () => {
  const { lessons, fetchLessons } = useLesson();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const lessonsByDate = useMemo(() => {
    const map: Record<string, typeof lessons> = {};
    lessons.forEach((lesson) => {
      const day = new Date(lesson.start_date).toDateString();
      if (!map[day]) map[day] = [];
      map[day].push(lesson);
    });
    return map;
  }, [lessons]);

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = date.toDateString();
    return lessonsByDate[dateStr] ? 'bg-purple-700 text-white rounded-full' : '';
  };

  const selectedLessons = selectedDate
    ? lessonsByDate[selectedDate.toDateString()] || []
    : [];

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-6 pb-12 pl-24 font-[Poppins] text-white">
        <h1 className="mb-6 text-4xl font-bold">Naptár</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Naptár */}
          <div className="w-full max-w-lg rounded-xl bg-[#2B0A3D] p-4 shadow-md">
            <ReactCalendar
              onChange={(value) => setSelectedDate(value as Date)}
              value={selectedDate}
              tileClassName={tileClassName}
              calendarType="iso8601"
              className="text-sm text-black rounded-lg"
              next2Label={null}
              prev2Label={null}
              locale="hu-HU"
            />
          </div>

          {/* Kiválasztott napi órák */}
          <div className="w-full">
            {selectedLessons.length > 0 ? (
              <ul className="space-y-4">
                {selectedLessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="rounded-lg bg-[#2B0A3D] p-4 shadow-md transition hover:shadow-lg"
                  >
                    <p className="text-lg font-semibold">
                      {lesson.teacherClass.subject} – {lesson.teacherClass.className}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(lesson.start_date).toLocaleString()} –{' '}
                      {new Date(lesson.end_date).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-300">
                      Foglalás: {lesson.lessonReservations?.[0]?.user.fullName || 'Nincs'} (
                      {lesson.lessonReservations?.[0]?.status})
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400 italic mt-4">
                {selectedDate
                  ? 'Ezen a napon nincs lefoglalt óra.'
                  : 'Válassz egy napot a naptárból!'}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Calendar;
