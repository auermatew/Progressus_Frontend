import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock as LockIcon, FaEnvelope as EmailIcon } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Heading from '../../components/ui/Heading';
import SubmitButton from '../../components/form/submitButton';
import Input from '../../components/form/input';
import Footer from '../../components/ui/Footer';
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = await login(email, password);
    if (!error) {
      const refreshedUser = await refreshUser();
      if (refreshedUser?.role === 'ROLE_TEACHER') {
        navigate('/dashboard');
      } else if (refreshedUser?.role === 'ROLE_STUDENT') {
        navigate('/studentdash');
      }
    } else {
      setErrorMessage('Hibás email vagy jelszó!');
    }
  };

  return (
    <>
      <nav className="nav fixed top-0 z-50 mx-auto my-4 flex h-20 w-screen items-center justify-center rounded-xl px-4 md:left-[35%] md:w-[30%]">
        <a href="/">
          <h1 className="title font-[Pacifico] text-4xl text-white">Progressus.</h1>
        </a>
      </nav>

      <div className="wrapper flex h-screen w-screen flex-col items-center justify-center md:flex-row">
        <div className="side-text hidden w-[45%] items-center justify-center md:flex"></div>

        <div className="login-form flex w-full flex-col items-center justify-center md:w-[55%]">
          <div className="form-wrapper z-10 flex w-full flex-col items-center justify-center md:w-[70%] md:border-x-2">
            <Heading content="Bejelentkezés" />

            {errorMessage && (
              <div className="mb-4 rounded-lg bg-red-500 px-4 py-2 text-center text-white">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
              <div className="input-wrapper m-4 flex w-4/5 items-center border-b-2 border-white px-4">
                <EmailIcon size={20} className="text-white" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-wrapper m-4 flex w-4/5 items-center border-b-2 border-white px-4">
                <LockIcon size={20} className="text-white" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Jelszó"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="forgot w-4/5 text-right">
                <a href="#" className="text-sm text-gray-300 hover:underline">
                  Elfelejtett jelszó?
                </a>
              </div>

              <div className="submit my-6 flex w-full justify-center">
                <SubmitButton type="submit" content="Bejelentkezés" />
              </div>
            </form>

            <div className="new-user text-center text-gray-400">
              Még nincs fiókod?{' '}
              <a href="/register" className="text-white hover:underline">
                Regisztrálok
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
