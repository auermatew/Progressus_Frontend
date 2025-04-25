import React, { useEffect, useState } from 'react';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import { useTeacherClass } from '../../contexts/TeacherClassContext';
import { useLesson } from '../../contexts/LessonContext';
import { LessonApiService } from '../../api/LessonApiService';
import './_teacherStyle.css';

const Lessons = () => {
  const { classes, fetchClasses } = useTeacherClass();
  const { lessons, fetchLessons } = useLesson();

  const [teacherClassId, setTeacherClassId] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    fetchClasses(teacherClassId);
    fetchLessons();
  }, [fetchClasses, fetchLessons, teacherClassId]);

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await LessonApiService.createLesson({
        teacherClassId,
        startDate,
        endDate,
      });
      setStatusMessage('Óra sikeresen létrehozva!');
      setTeacherClassId(0);
      setStartDate('');
      setEndDate('');
      fetchLessons();
    } catch (error) {
      console.error('Hiba óra létrehozásakor:', error);
      setStatusMessage('Hiba történt az óra létrehozása során.');
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await LessonApiService.deleteLesson(lessonId);
      setStatusMessage('Óra törölve!');
      fetchLessons();
    } catch (error) {
      console.error('Hiba óra törlésekor:', error);
      setStatusMessage('Nem sikerült az óra törlése.');
    }
  };

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pl-24 pr-6 pb-12 font-[Poppins] text-white">
        <h1 className="text-4xl font-bold mb-6">Órák kezelése</h1>

        {/* Új óra létrehozása */}
        <form onSubmit={handleCreateLesson} className="mb-10 space-y-4 rounded-lg bg-[#2B0A3D] p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Új óra létrehozása</h2>

          {statusMessage && (
            <div className="mb-4 text-sm font-medium text-green-400">{statusMessage}</div>
          )}

          <div className="flex flex-col gap-4">
            <select
              required
              value={teacherClassId}
              onChange={(e) => setTeacherClassId(Number(e.target.value))}
              className="rounded-md bg-[#1A0129] p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Válassz tantárgyat...</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.subjects.join(', ')})
                </option>
              ))}
            </select>

            <input
              type="datetime-local"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="rounded-md bg-[#1A0129] p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="datetime-local"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="rounded-md bg-[#1A0129] p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700"
            >
              Óra létrehozása
            </button>
          </div>
        </form>

        {/* Meglévő órák listája */}
        <h2 className="text-2xl font-semibold mb-4">Létező órák</h2>

        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-lg bg-[#2B0A3D] p-4 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold mb-1">{lesson.teacherClass.title}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(lesson.startDate).toLocaleString()} - {new Date(lesson.endDate).toLocaleTimeString()}
                </p>
                <p className="text-sm text-gray-400">
                  {lesson.reserved ? 'Foglalva' : 'Szabad'}
                </p>
                {!lesson.reserved && (
                  <button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="mt-2 w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-700"
                  >
                    Óra törlése
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">Jelenleg nincs létrehozott órád.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Lessons;
