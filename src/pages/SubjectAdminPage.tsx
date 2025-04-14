import { useState } from 'react';
import { useSubject } from '../contexts/SubjectContext';
import Input from '../components/form/input';
import SubmitButton from '../components/form/submitButton';

const SubjectAdminPage = () => {
  const { subjects, createSubjects, editSubject, deleteSubject } = useSubject();
  const [newSubject, setNewSubject] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [editMode, setEditMode] = useState<{ id: string; name: string; verified: boolean } | null>(null);

  const handleCreate = async () => {
    if (!newSubject.trim()) return;
    await createSubjects([{ subject: newSubject, isVerified }]);
    setNewSubject('');
    setIsVerified(false);
  };

  const handleEdit = async () => {
    if (!editMode) return;
    await editSubject(editMode.id, {
      subject: editMode.name,
      isVerified: editMode.verified,
    });
    setEditMode(null);
  };

  return (
    <div className="min-h-screen bg-[#1A0129] text-white p-8 font-[Poppins]">
      <h1 className="text-3xl font-bold mb-6">Tantárgyak kezelése</h1>

      <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col w-full md:w-[300px]">
          <label htmlFor="subjectInput">Új tantárgy neve</label>
          <Input
            id="subjectInput"
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Pl. Matematika"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)}
          />
          Ellenőrzött
        </label>
        <SubmitButton content="Létrehozás" type="button" onClick={handleCreate} />
      </div>

      {subjects.length === 0 ? (
        <p>Nincs tantárgy felvéve.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subj) => (
            <div key={subj.id} className="bg-[#2B0A3D] p-4 rounded-xl border border-white shadow-md">
              {editMode?.id === subj.id.toString() ? (
                <>
                  <Input
                    id="editSubjectInput"
                    type="text"
                    value={editMode.name}
                    onChange={(e) =>
                      setEditMode({ ...editMode, name: e.target.value })
                    }
                    placeholder="Tantárgy neve"
                  />
                  <label className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={editMode.verified}
                      onChange={(e) =>
                        setEditMode({ ...editMode, verified: e.target.checked })
                      }
                    />
                    Ellenőrzött
                  </label>
                  <div className="flex gap-2 mt-3">
                    <SubmitButton content="Mentés" type="button" onClick={handleEdit} />
                    <button
                      className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
                      onClick={() => setEditMode(null)}
                    >
                      Mégse
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{subj.subject}</h2>
                  <p className="text-sm text-gray-400">
                    Állapot: {subj.isVerified ? '✅ Ellenőrzött' : '❌ Nem ellenőrzött'}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <button
                      className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                      onClick={() =>
                        setEditMode({
                          id: subj.id.toString(),
                          name: subj.subject,
                          verified: subj.isVerified,
                        })
                      }
                    >
                      Szerkesztés
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
                      onClick={() => deleteSubject(subj.id.toString())}
                    >
                      Törlés
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectAdminPage;