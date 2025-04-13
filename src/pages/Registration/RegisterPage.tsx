import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaLock as LockIcon, FaUser as UserIcon, FaEnvelope as EmailIcon } from 'react-icons/fa';
import Heading from '../../components/ui/Heading';
import SubmitButton from '../../components/form/submitButton';
import Footer from '../../components/ui/Footer';
import Input from '../../components/form/input';
import './register.css';

const RegisterSchema = z
  .object({
    fullName: z.string().min(1, 'Teljes név megadása kötelező'),
    email: z.string().email('Érvénytelen email cím'),
    password: z.string().min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie'),
    confirmPassword: z.string(),
    role: z.enum(['TEACHER', 'STUDENT']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'A jelszavak nem egyeznek',
    path: ['confirmPassword'],
  });

type RegisterData = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [statusMessage, setStatusMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { role: 'TEACHER' },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      setStatusMessage({ type: 'success', text: 'Sikeres regisztráció!' });
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setStatusMessage({ type: 'error', text: 'Sikertelen regisztráció.' });
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
        <div className="side-text hidden h-[100%] w-[40%] items-center justify-center md:flex"></div>
        <div className="register-form flex h-full w-full flex-col items-center justify-center md:h-[100%] md:w-[60%]">
          <div className="form-wrapper z-10 flex h-[100%] w-[100%] flex-col items-center justify-center p-4 md:w-[70%] md:border-x-2">
            <Heading content="Regisztráció" />
            {statusMessage && (
              <div
                className={`mb-4 w-full rounded-lg px-4 py-2 text-center font-[Poppins] text-white ${
                  statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-600'
                }`}
              >
                {statusMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="form flex w-[100%] flex-col items-center justify-center md:flex-row">
                <div className="column flex w-[100%] flex-col items-center justify-center md:w-[50%]">
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <UserIcon size={20} className="left-6 block text-white" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Teljes név"
                      {...register('fullName')}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-400">{errors.fullName.message}</p>
                  )}

                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <EmailIcon size={20} className="left-6 block text-white" />
                    <Input id="email" type="email" placeholder="Email cím" {...register('email')} />
                  </div>
                  {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
                </div>
                <div className="passwords flex w-[100%] flex-col items-center justify-center md:w-[50%]">
                  <div
                    className={`input-wrapper m-2 flex w-full flex-row items-center px-4 md:w-[90%]`}
                  >
                    <LockIcon size={20} className="right-6 block text-white" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Jelszó"
                      {...register('password')}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password.message}</p>
                  )}

                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <LockIcon size={20} className="right-6 block text-white" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Jelszó újra"
                      {...register('confirmPassword')}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              <div className="role-select my-2 flex w-[100%] flex-row items-center justify-center">
                <div className="inline-flex rounded-lg px-4">
                  <input
                    type="radio"
                    value="TEACHER"
                    {...register('role')}
                    id="teacherRadio"
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
                    value="STUDENT"
                    {...register('role')}
                    id="studentRadio"
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
              {errors.role && (
                <p className="text-center text-sm text-red-400">{errors.role.message}</p>
              )}
              <div className="submit flex w-full items-center justify-center p-4 md:mb-0">
                <SubmitButton type="submit" content="Regisztráció" />
              </div>
            </form>
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
