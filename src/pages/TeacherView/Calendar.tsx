import { useEffect } from 'react';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import { useLesson } from '../../contexts/LessonContext';
import './_teacherStyle.css';

const Calendar = () => {
  const { lessons, fetchLessons } = useLesson();

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-6 pb-12 pl-24 font-[Poppins] text-white">
        <h1 className="mb-6 text-4xl font-bold">Naptár</h1>

        {lessons.length > 0 ? (
          <ul className="space-y-4">
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                className="rounded-lg bg-[#2B0A3D] p-4 shadow-md transition hover:shadow-lg"
              >
                <p className="text-lg font-semibold">
                  {lesson.teacherClass.subject} – {lesson.teacherClass.className}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(lesson.start_date).toLocaleString()} -{' '}
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
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-lg text-gray-400 italic">Jelenleg nincs közelgő óra.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Calendar;
