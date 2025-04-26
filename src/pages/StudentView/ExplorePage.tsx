import { useEffect, useState } from 'react';
import { useTeacher } from '../../contexts/TeacherContext';
import { Teacher } from '../../schema/teacher';
import { TeacherClassLesson } from '../../schema/lesson';
import { LessonApiService } from '../../api/LessonApiService';
import NavbarSideSt from './NavbarSideSt';
import BookLessonModal from '../../components/BookLessonModal';
import BookingPopup from '../../components/BookingPopup';
import Footer from '../../components/ui/Footer';
import { FaSearch } from 'react-icons/fa';
import '../../styles/animations.css';
import './_studentStyle.css';

const ExplorePage = () => {
  const { teachers, getTeachers } = useTeacher();
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<
    (Teacher & { lessonSlots?: TeacherClassLesson[] }) | null
  >(null);

  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  const allSubjects = Array.from(
    new Set(teachers.flatMap((t) => t.subjects?.map((s) => s.name.toLowerCase()) || []))
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

  const handleOpenModal = async (teacher: Teacher) => {
    try {
      const lessonSlots = await LessonApiService.getLessonsForTeacher(teacher.id);
      setSelectedTeacher({ ...teacher, lessonSlots });
      setModalOpen(true);
    } catch (error) {
      console.error('Hiba az órák lekérésekor:', error);
      alert('Nem sikerült lekérni az elérhető órákat.');
    }
  };

  const handleSendRequest = async (lessonId: number) => {
    try {
      await LessonApiService.reserveLesson(lessonId);
      setShowPopup(true);
      setModalOpen(false);
      setSelectedTeacher(null);
    } catch (error: any) {
      console.error('Foglalás hiba:', error);
      const msg = error?.response?.data?.message || error.message || '';
      if (msg.includes('already reserved')) {
        alert('Ez az óra már le van foglalva.');
      } else if (msg.includes('already submitted')) {
        alert('Már lefoglaltad ezt az órát.');
      } else if (msg.includes('own lesson')) {
        alert('Nem foglalhatod le a saját órádat!');
      } else {
        alert('Ismeretlen hiba történt a foglalás során.');
      }
    }
  };

  return (
    <>
      <NavbarSideSt />
      <div className="wrapper min-h-screen w-full bg-gradient-to-b from-black to-[#1A1A1A] px-4 py-8">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">Tanáraink</h1>

        {/* Search bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Keresés név vagy tantárgy alapján..."
              className="w-full rounded-xl border-none bg-[#2B0A3D] px-4 py-2 pr-12 text-white shadow-inner focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-purple-600 p-2">
              <FaSearch size={16} className="text-white" />
            </div>
          </div>
        </div>

        {/* Subject filters */}
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
                selectedSubject === subject
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Teacher cards */}
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
              <div className="mt-4 flex flex-col gap-2">
                <button
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                  onClick={() => handleOpenModal(teacher)}
                >
                  Óra foglalása
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal & Popup */}
      {modalOpen && selectedTeacher && (
        <BookLessonModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSendRequest}
          teacherName={selectedTeacher.fullName}
          lessonSlots={selectedTeacher.lessonSlots || []}
        />
      )}

      <BookingPopup
        message="Foglalás elküldve!"
        visible={showPopup}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default ExplorePage;
