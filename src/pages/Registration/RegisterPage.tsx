import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLock as LockIcon, FaEnvelope as EmailIcon, FaUser as UserIcon } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Heading from '../../components/ui/Heading';
import Input from '../../components/form/input';
import SubmitButton from '../../components/form/submitButton';
import Footer from '../../components/ui/Footer';
import './register.css';

const RegisterSchema = z.object({
  fullName: z.string().min(1, 'Teljes név megadása kötelező'),
  email: z.string().email('Érvénytelen email cím'),
  password: z.string().min(8, 'A jelszónak minimum 8 karakteresnek kell lennie'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'A jelszavak nem egyeznek meg!',
  path: ['confirmPassword'],
});

type RegisterData = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch {
      setStatus('error');
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

        <div className="register-form flex w-[70%] h-full flex-col items-center justify-center">
          <div className="form-wrapper z-10 w-full h-full flex flex-col items-center justify-center p-4 md:w-3/5 md:border-x-2">
            <Heading content="Regisztráció" />

            {status === 'success' && (
              <div className="mb-4 rounded-lg bg-green-600 px-4 py-2 text-center text-white">
                Sikeres regisztráció!
              </div>
            )}
            {status === 'error' && (
              <div className="mb-4 rounded-lg bg-red-500 px-4 py-2 text-center text-white">
                Hiba történt a regisztráció során!
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[70%] gap-4">
              <div className="input-wrapper flex items-center border-b-2 border-white px-4">
                <UserIcon size={20} className="text-white" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Teljes név"
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-400">{errors.fullName.message}</p>}

              <div className="input-wrapper flex items-center border-b-2 border-white px-4">
                <EmailIcon size={20} className="text-white" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email cím"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}

              <div className="input-wrapper flex items-center border-b-2 border-white px-4">
                <LockIcon size={20} className="text-white" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Jelszó"
                  {...register('password')}
                />
              </div>
              {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}

              <div className="input-wrapper flex items-center border-b-2 border-white px-4">
                <LockIcon size={20} className="text-white" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Jelszó újra"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}

              <div className="mt-4 flex w-full justify-center">
                <SubmitButton type="submit" content="Regisztráció" />
              </div>
            </form>

            <div className="mt-4 text-center text-gray-400">
              Már van fiókod?{' '}
              <a href="/login" className="text-white hover:underline">Bejelentkezés</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RegisterPage;
