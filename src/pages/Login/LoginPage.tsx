// Login page content

import { FaLock as LockIcon, FaEnvelope as EmailIcon } from 'react-icons/fa';
import Heading from '../../components/ui/Heading';
import SubmitButton from '../../components/form/submitButton';
import Input from '../../components/form/input';
import './login.css';
//import Gyuri from "../../assets/images/lenin-gyorgy.jpg";
import Footer from '../../components/ui/Footer';

const LoginPage = () => {
  return (
    <>
      <nav className="nav fixed top-0 z-50 mx-auto my-4 flex h-20 w-screen items-center justify-center rounded-xl px-4 md:left-[35%] md:w-[30%]">
        <a href="/">
          <h1 className='title font-[Pacifico] text-white text-4xl'>Progressus.</h1>
        </a>
      </nav>
      <div className="wrapper flex h-screen w-screen flex-1 flex-col items-center justify-center md:flex-row">
        <div className="side-text hidden h-[100%] w-[45%] items-center justify-center md:flex">
          {/* Virág Gyuri portré Lenin profilból */}
          {/* <img src={Gyuri} className="shadow-2xl w-full h-full" /> */}
        </div>
        <div className="login-form flex h-full w-full flex-col items-center justify-center md:h-[100%] md:w-[55%]">
          <div className="form-wrapper z-10 flex h-[100%] w-[100%] flex-col items-center justify-center md:w-[70%] md:border-x-2">
            <Heading content="Bejelentkezés" />
            <form className="flex w-[100%] flex-col items-center justify-center">
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
            <div className="submit mb-8 flex w-full items-center justify-center p-4 md:mb-0">
              <a href="#" className="flex h-full w-full items-center justify-center">
                <SubmitButton content="Bejelentkezés" />
              </a>
            </div>
            </form>
            <div className="new-user flex w-full flex-col items-center justify-center">
              <p className="p-2 font-[Poppins] text-gray-400">
                Még nem regisztráltál? {' '}
                <a href="/register" className="text-white hover:underline">
                  Regisztrálok
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

export default LoginPage;
