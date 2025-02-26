import { FaLock as LockIcon, FaUser as UserIcon, FaEnvelope as EmailIcon } from 'react-icons/fa';
import Navbar from '../../components/ui/NavbarTop';
import ActionButton from '../../components/ui/ActionButton';
import Input from '../../components/form/input';
import Footer from '../../components/ui/Footer';

import './register.css';
import Heading from '../../components/ui/Heading';

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper flex h-screen w-screen flex-1 flex-col items-center justify-center md:flex-row">
        <div className="side-text hidden h-[100%] w-[30%] items-center justify-center md:flex">
          {/* Ide jöhet egy kép vagy egy illusztráció */}
        </div>
        <div className="register-form flex h-full w-full flex-col items-center justify-center md:h-[100%] md:w-[70%]">
          <div className="form-wrapper z-10 flex h-[100%] w-[100%] flex-col items-center justify-center p-4 md:w-[60%]">
            <Heading content="Regisztráció" />
            <form className="w-full">
              <div className="form flex w-[100%] flex-col items-center justify-center md:flex-row">
                <div className="column flex w-[100%] flex-col items-center justify-center md:w-[50%]">
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <UserIcon size={20} className="left-6 block text-white" />
                    <Input id="username" type="text" placeholder="Teljes név" />
                  </div>
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <EmailIcon size={20} className="left-6 block text-white" />
                    <Input id="email" type="email" placeholder="Email cím" />
                  </div>
                </div>
                <div className="passwords flex w-[100%] flex-col items-center justify-center md:w-[50%]">
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:w-[90%]">
                    <LockIcon size={20} className="right-6 block text-white" />
                    <Input id="password" type="password" placeholder="Jelszó" />
                  </div>
                  <div className="input-wrapper m-2 flex w-full flex-row items-center border-b-2 border-white px-4 md:mb-4 md:w-[90%]">
                    <LockIcon size={20} className="right-6 block text-white" />
                    <Input id="confirmPassword" type="password" placeholder="Jelszó újra" />
                  </div>
                </div>
              </div>
              <div className="role-select flex w-[100%] flex-row items-center justify-center bg-amber-200">
                role
              </div>
            </form>
            <div className="submit mb-8 flex w-full items-center justify-center p-4 md:mb-0">
              <ActionButton content="Regisztráció" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
