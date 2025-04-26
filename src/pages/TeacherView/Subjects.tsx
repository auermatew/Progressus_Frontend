import { useState } from 'react';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import { useSubject } from '../../contexts/SubjectContext';
import './_teacherStyle.css';

const Subjects = () => {
  const { subjects, createSubjects, deleteSubject } = useSubject();
  const [newSubject, setNewSubject] = useState('');

  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;
    try {
      await createSubjects([{ subject: newSubject, isVerified: false }]);
      setNewSubject('');
    } catch (error) {
      console.error('Hiba a tantárgy hozzáadásakor:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Biztosan törlöd ezt a tantárgyat?')) return;
    try {
      await deleteSubject(id);
    } catch (error) {
      console.error('Hiba a tantárgy törlésekor:', error);
    }
  };

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-full bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-6 pb-12 pl-24 font-[Poppins] text-white">
        <h1 className="mb-8 text-4xl font-bold">Tantárgyak</h1>

        {/* Új tantárgy létrehozása */}
        <div className="mb-10 rounded-lg bg-[#2B0A3D] p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Új tantárgy hozzáadása</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Tantárgy neve..."
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full rounded-md bg-[#3F1E64] p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAddSubject}
              className="rounded-md bg-purple-600 px-4 py-2 font-semibold hover:bg-purple-700"
            >
              Hozzáadás
            </button>
          </div>
        </div>

        {/* Tantárgyak listázása */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center justify-between rounded-lg bg-[#2B0A3D] p-6 shadow-md hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold">{subject.subject}</h3>
                <p
                  className={`text-sm font-semibold ${
                    subject.verified ? 'text-green-400' : 'text-yellow-400'
                  }`}
                >
                  {subject.verified ? 'Ellenőrzött' : 'Ellenőrzés alatt'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(subject.id.toString())}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold hover:bg-red-700"
              >
                Törlés
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subjects;
