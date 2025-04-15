import { useEffect, useState } from 'react';
import { useTeacher } from '../../contexts/TeacherContext';
import NavbarSideSt from './NavbarSideSt';
import Footer from '../../components/ui/Footer';
import { FaSearch } from 'react-icons/fa';

const ExplorePage = () => {
  const { teachers, getTeachers } = useTeacher();
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  const allSubjects = Array.from(
    new Set(
      teachers.flatMap((t) => t.subjects?.map((s) => s.name.toLowerCase()) || [])
    )
  );

  const filteredTeachers = teachers.filter((teacher) => {
    const nameMatch = teacher.fullName.toLowerCase().includes(search.toLowerCase());
    const subjectMatch = teacher.subjects?.some((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    const subjectFilter = selectedSubject
      ? teacher.subjects?.some((s) => s.name.toLowerCase() === selectedSubject)
      : true;
    return (nameMatch || subjectMatch) && subjectFilter;
  });

  return (
    <>
      <NavbarSideSt />
      <div className="wrapper min-h-screen pl-20 w-full bg-gradient-to-b from-black to-[#1A1A1A] px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">Tanáraink</h1>

        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Keresés név vagy tantárgy alapján..."
              className="w-full rounded-full border-none bg-[#2B0A3D] px-6 py-4 pr-12 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-purple-600 p-4">
              <FaSearch size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedSubject('')}
            className={`rounded-full px-4 py-1 text-sm font-medium transition ${
              selectedSubject === '' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Összes
          </button>
          {allSubjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`rounded-full px-4 py-1 text-sm font-medium transition ${
                selectedSubject === subject ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="w-full max-w-sm rounded-xl bg-[#2B0A3D] p-4 text-white shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={teacher.profilePicture || 'https://via.placeholder.com/80'}
                  alt={teacher.fullName}
                  className="h-20 w-20 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{teacher.fullName}</h2>
                  <p className="text-sm text-gray-300">{teacher.bio}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-400">Tantárgyak:</span>
                <ul className="list-inside list-disc text-sm text-gray-200">
                  {teacher.subjects?.map((s, idx) => <li key={idx}>{s.name}</li>)}
                </ul>
              </div>
              <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Profil megtekintése
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExplorePage;