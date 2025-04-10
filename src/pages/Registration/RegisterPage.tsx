import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthApiService from '../../api/AuthApiService';
import { FaLock as LockIcon, FaUser as UserIcon, FaEnvelope as EmailIcon } from 'react-icons/fa';
import Heading from '../../components/ui/Heading';
import Input from '../../components/form/input';
import SubmitButton from '../../components/form/submitButton';
import Footer from '../../components/ui/Footer';

import './register.css';

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'TEACHER' | 'STUDENT'>('TEACHER');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('A jelszavak nem egyeznek!');
      return;
    }

    try {
      await AuthApiService.register({ fullName, email, password, role });
      alert('Sikeres regisztráció!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Sikertelen regisztráció.');
    }
  };

  return (
    <>
      <nav className="nav fixed top-0 z-50 mx-auto my-4 flex h-20 w-screen items-center justify-center rounded-xl px-4 md:left-[35%] md:w-[30%]">
        <a href="/">
          <h1 className="title font-[Pacifico] text-4xl text-white">Progressus.</h1>
        </a>
      </nav>
      <div className="wrapper flex h-screen w-screen flex-1 flex-col items-center justify-center md:flex-row">
        <div className="side-text hidden h-[100%] w-[40%] items-center justify-center md:flex">
          {/* Ide jöhet egy kép vagy egy illusztráció */}
        </div>
        <div className="register-form flex h-full w-full flex-col items-center justify-center md:h-[100%] md:w-[60%]">
          <div className="form-wrapper z-10 flex h-[100%] w-[100%] flex-col items-center justify-center p-4 md:w-[70%] md:border-x-2">
            <Heading content="Regisztráció" />
            <form onSubmit={handleSubmit} className="w-full">
              <div className="form flex w-[100%] flex-col items-center justify-center md:flex-row">
                <div className="column flex w-[100%] flex-col items-center justify-center md:w-[50%]">
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <UserIcon size={20} className="left-6 block text-white" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      placeholder="Teljes név"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <EmailIcon size={20} className="left-6 block text-white" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      placeholder="Email cím"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="passwords flex w-[100%] flex-col items-center justify-center md:w-[50%]">
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <LockIcon size={20} className="right-6 block text-white" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      placeholder="Jelszó"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <LockIcon size={20} className="right-6 block text-white" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      placeholder="Jelszó újra"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="role-select my-2 flex w-[100%] flex-row items-center justify-center">
                <div className="inline-flex rounded-lg px-4">
                  <input
                    type="radio"
                    name="role"
                    id="teacherRadio"
                    checked={role === 'TEACHER'}
                    onChange={() => setRole('TEACHER')}
                    hidden
                  />
                  <label
                    htmlFor="teacherRadio"
                    className="radio w-24 cursor-pointer self-center rounded-lg px-4 py-2 text-center text-lg hover:opacity-75"
                  >
                    Tanár
                  </label>
                </div>
                <div className="inline-flex rounded-lg px-4">
                  <input
                    type="radio"
                    name="role"
                    id="studentRadio"
                    checked={role === 'STUDENT'}
                    onChange={() => setRole('STUDENT')}
                    hidden
                  />
                  <label
                    htmlFor="studentRadio"
                    className="radio w-24 cursor-pointer self-center rounded-lg px-4 py-2 text-center text-lg hover:opacity-75"
                  >
                    Diák
                  </label>
                </div>
              </div>
            </form>
            <div className="submit flex w-full items-center justify-center p-4 md:mb-0">
              <SubmitButton type="submit" content="Regisztráció" />
            </div>
            <div className="new-user flex w-full flex-col items-center justify-center">
              <p className="font-[Poppins] text-gray-400">
                Már regisztráltál?{' '}
                <a href="/login" className="text-white hover:underline">
                  Bejelentkezés
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
