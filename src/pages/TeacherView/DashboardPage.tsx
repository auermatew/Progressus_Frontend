import React from 'react';
import NavbarSide from './NavbarSide';
import TeacherRequests from '../../components/TeacherRequests';
import Footer from '../../components/ui/Footer';
import '../../assets/fonts/fonts.css';
import './_teacherStyle.css';

const mockRequests = [
  {
    id: 1,
    studentName: 'Kovács Anna',
    startDate: '2025-04-20T10:00:00',
    endDate: '2025-04-20T11:00:00',
    subject: 'Matematika',
    className: '9.A',
  },
  {
    id: 2,
    studentName: 'Kovács Anna',
    startDate: '2025-04-20T10:00:00',
    endDate: '2025-04-20T11:00:00',
    subject: 'Matematika',
    className: '9.A',
  },
  {
    id: 3,
    studentName: 'Nagy Péter',
    startDate: '2025-04-21T14:30:00',
    endDate: '2025-04-21T15:30:00',
    subject: 'Fizika',
    className: '10.B',
  },
  {
    id: 4,
    studentName: 'Nagy Péter',
    startDate: '2025-04-21T14:30:00',
    endDate: '2025-04-21T15:30:00',
    subject: 'Fizika',
    className: '10.B',
  },
  {
    id: 5,
    studentName: 'Nagy Péter',
    startDate: '2025-04-21T14:30:00',
    endDate: '2025-04-21T15:30:00',
    subject: 'Fizika',
    className: '10.B',
  },
  {
    id: 6,
    studentName: 'Kovács Anna',
    startDate: '2025-04-20T10:00:00',
    endDate: '2025-04-20T11:00:00',
    subject: 'Matematika',
    className: '9.A',
  },
  {
    id: 7,
    studentName: 'Kovács Anna',
    startDate: '2025-04-20T10:00:00',
    endDate: '2025-04-20T11:00:00',
    subject: 'Matematika',
    className: '9.A',
  },
];

const DashboardPage = () => {
  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-6 pb-20 pl-24 text-white">
        <h1 className="mb-6 font-[Poppins] text-4xl font-bold">Kezdőlap</h1>

        <div className="mb-4">
          <h2 className="mb-4 text-2xl font-semibold">Függőben lévő órakérések</h2>
          <TeacherRequests />

          {/* Uncomment this section to display mock requests */}
          {/* {mockRequests.length === 0 ? (
            <p className="text-gray-400">Nincsenek függőben lévő kérések.</p>
          ) : (
            <div className="overflow-x-auto">
              <div className="flex flex-nowrap gap-4">
                {mockRequests.map((req) => (
                  <div
                    key={req.id}
                    className="max-w-[300px] min-w-[280px] flex-shrink-0 rounded-lg bg-[#2B0A3D] p-4 shadow-lg transition hover:shadow-xl"
                  >
                    <h3 className="mb-1 text-lg font-bold">{req.studentName}</h3>
                    <p className="text-sm text-gray-300">
                      {new Date(req.startDate).toLocaleString()} -{' '}
                      {new Date(req.endDate).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Tantárgy: <span className="text-white">{req.subject}</span> | Osztály:{' '}
                      <span className="text-white">{req.className}</span>
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold hover:bg-green-700">
                        Elfogadás
                      </button>
                      <button className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-700">
                        Elutasítás
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
