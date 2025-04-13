import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import Input from '../../components/form/input';
import SubmitButton from '../../components/form/submitButton';
import './_teacherStyle.css';

const MyPage = () => {
  const { user, refreshUser, updateUserProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateUserProfile({ fullName, email });
      await refreshUser();
      setStatusMessage('Sikeres mentés!');
    } catch {
      setStatusMessage('Hiba történt mentés közben.');
    }
  };

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen pt-4 pr-4 pl-24 font-[Poppins] text-white">
        <h1 className="mb-4 text-4xl font-bold">Saját profilom</h1>

        {statusMessage && (
          <div className="mb-4 rounded-lg bg-green-600 px-4 py-2 text-white">{statusMessage}</div>
        )}

        <form
          onSubmit={handleSave}
          className="flex max-w-xl flex-col gap-4 rounded-xl border border-white p-6"
        >
          <label htmlFor="fullName">Teljes név</label>
          <Input
            id="fullName"
            type="text"
            placeholder="Teljes név"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="email">Email cím</label>
          <Input
            id="email"
            type="email"
            placeholder="Email cím"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <SubmitButton content="Mentés" type="submit" />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
