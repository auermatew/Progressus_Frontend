import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import Input from '../../components/form/input';
import SubmitButton from '../../components/form/submitButton';
import './_teacherStyle.css';

const MyPage = () => {
  const { user, refreshUser, updateUserProfile, token } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profilePreview, setProfilePreview] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setDescription(user.description || '');
      setProfilePicture(user.profilePicture || '');
      setProfilePreview(user.profilePicture || '');
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({ fullName, email, password, phoneNumber, description, profilePicture });
      await refreshUser();
      setStatusMessage('Sikeres mentés!');
    } catch {
      setStatusMessage('Hiba történt mentés közben.');
    }
  };

  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-full pt-4 pl-24 pr-4 text-white font-[Poppins] bg-gradient-to-b from-[#1A0129] to-[#301d48]">
        <div className="max-w-4xl mx-auto p-6 bg-[#2B0A3D] border border-white rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Saját profilom</h1>

          {statusMessage && (
            <div className="mb-6 rounded-lg bg-green-600 px-4 py-2 text-center text-white font-medium">
              {statusMessage}
            </div>
          )}

          {profilePreview && (
            <div className="flex justify-center mb-6">
              <img
                src={profilePreview}
                alt="Profilkép"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>
          )}

          <form
            onSubmit={handleSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label htmlFor="fullName" className="text-lg font-semibold">Teljes név</label>
              <div className="border rounded-2xl my-2">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Teljes név"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-lg font-semibold">Email cím</label>
              <div className="border rounded-2xl my-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className='bg-[#2B0A3D]'>
              <label htmlFor="password" className="text-lg font-semibold">Jelszó (opcionális)</label>
              <div className="border rounded-2xl my-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Új jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="text-lg font-semibold">Telefonszám</label>
              <div className="border rounded-2xl my-2">
                <Input
                  id="phoneNumber"
                  type="text"
                  placeholder="Pl. +36301234567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="text-lg font-semibold">Bemutatkozás</label>
              <div className="my-2">
                <textarea
                  id="description"
                  placeholder="Írj magadról pár szót..."
                  className="w-full rounded-xl bg-transparent border border-white text-white p-3 min-h-[120px] focus:outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="profilePicture" className="text-lg font-semibold">Profilkép feltöltése</label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                className="w-full rounded-lg bg-white text-black p-2"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                      const res = await fetch("/api/v1/images/profile-picture/upload", {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                      });

                      const uploadedImage = await res.json();
                      setProfilePicture(uploadedImage.url);
                      setProfilePreview(uploadedImage.url);
                    } catch (err) {
                      console.error("Kép feltöltése sikertelen", err);
                    }
                  }
                }}
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <SubmitButton content="Mentés" type="submit" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
