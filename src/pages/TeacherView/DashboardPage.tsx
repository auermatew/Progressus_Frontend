import { useState, useEffect } from 'react';
import NavbarSide from './NavbarSide';
import TeacherRequests from '../../components/TeacherRequests';
import Footer from '../../components/ui/Footer';
import { useLesson } from '../../contexts/LessonContext';
import { usePayment } from '../../contexts/PaymentContext';
import '../../assets/fonts/fonts.css';
import './_teacherStyle.css';

const DashboardPage = () => {
  const { lessons, fetchLessons } = useLesson();
  const { billingDetails } = usePayment();
  const [stats, setStats] = useState({
    totalLessons: 0,
    reservedLessons: 0,
    freeLessons: 0,
  });

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  useEffect(() => {
    const total = lessons.length;
    const reserved = lessons.filter((l) => l.reserved).length;
    const free = total - reserved;
    setStats({ totalLessons: total, reservedLessons: reserved, freeLessons: free });
  }, [lessons]);

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-6 pb-20 pl-24 text-white">
        <h1 className="mb-6 font-[Poppins] text-4xl font-bold">Kezdőlap</h1>

        {/* Statisztikák */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-10">
          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Összes óra</h2>
            <p className="text-3xl font-bold">{stats.totalLessons}</p>
          </div>
          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Foglalva</h2>
            <p className="text-3xl font-bold text-green-400">{stats.reservedLessons}</p>
          </div>
          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Szabad</h2>
            <p className="text-3xl font-bold text-yellow-400">{stats.freeLessons}</p>
          </div>

          {/* Új: Egyenleg megjelenítése */}
          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-2">Egyenleg</h2>
            <p className="text-3xl font-bold text-purple-400">
              {billingDetails?.balance ?? 0} Ft
            </p>
            <button className="mt-4 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-700">
              Összeg feltöltése
            </button>
          </div>
        </div>

        {/* Foglalási kérések */}
        <div className="mb-4">
          <TeacherRequests />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
