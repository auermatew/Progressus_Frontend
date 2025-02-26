// Login page content

import { FaLock as LockIcon, FaEnvelope as EmailIcon } from 'react-icons/fa';
import Navbar from '../../components/ui/NavbarTop';
import Heading from '../../components/ui/Heading';
import ActionButton from '../../components/ui/ActionButton';
import Input from '../../components/form/input';
import './login.css';
// import Teacher from "../../assets/images/teacher.jpg";
import Footer from '../../components/ui/Footer';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper flex h-screen w-screen flex-1 flex-col items-center justify-center md:flex-row">
        <div className="side-text hidden h-[100%] w-[50%] items-center justify-center md:flex">
          {/* <img src={Teacher} className="rounded-4xl shadow-2xl w-[60%] h-[60%]" /> */}
          {/* Virág Gyuri portré Lenin profilból */}
        </div>
        <div className="login-form flex h-full w-full flex-col items-center justify-center md:h-[100%] md:w-[50%]">
          <div className="form-wrapper z-10 flex h-[100%] w-[100%] flex-col items-center justify-center md:w-[70%] md:border-x-2">
            <Heading content="Bejelentkezés" />
            <form className="flex w-[100%] flex-col items-center justify-center my-6">
              <div className="input-wrapper m-4 flex w-[90%] flex-row items-center border-b-2 border-white px-4 md:w-[80%]">
                <EmailIcon size={20} className="left-6 block text-white" />
                <Input id="unInput" type="text" placeholder="Email cím" />
              </div>
              <div className="input-wrapper m-4 flex w-[90%] flex-row items-center border-b-2 border-white px-4 md:mb-4 md:w-[80%]">
                <LockIcon size={20} className="right-6 block text-white" />
                <Input id="pwInput" type="password" placeholder="Jelszó" />
              </div>
              <div className="forgot flex w-[80%] items-center justify-end">
                <a
                  href="https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg"
                  className="text-white hover:underline"
                >
                  Elfelejtett jelszó?
                </a>
              </div>
            </form>
            <div className="submit mb-8 flex w-full items-center justify-center p-4 md:mb-0">
              <ActionButton content="Bejelentkezés" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
