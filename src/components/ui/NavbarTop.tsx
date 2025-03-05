import { useState, useEffect } from 'react';
import { LuMenu as MenuIcon } from 'react-icons/lu';
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import ActionButton from './ActionButton';
import '../../styles/navbarTop.css';
import '../../assets/fonts/fonts.css';

const NavbarTop = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('/progressus/home');

  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) setActiveTab(storedTab);
  }, []);

  const handleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 mx-auto my-4 flex h-20 w-screen items-center justify-between rounded-xl px-4 md:left-[10%] md:w-[80%]">
        <div className="hidden w-full md:flex">
          <ul className="flex w-full items-center justify-evenly">
            <li onClick={() => handleTabClick('/progressus')}>
              <a
                href="/"
                className="w-full p-2 text-center font-[Pacifico] leading-6 font-bold text-white md:text-3xl"
              >
                Progressus.
              </a>
            </li>
            <li onClick={() => handleTabClick('/progressus/home')}>
              <a
                href="/home"
                className={`relative px-4 py-2 font-[Poppins] text-lg font-bold text-white ${
                  activeTab === '/progressus/home'
                    ? "after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-8 after:-translate-x-1/2 after:rounded after:bg-white after:opacity-60 after:content-['']"
                    : ''
                }`}
              >
                Kezdőlap
              </a>
            </li>
            <li>
              <a
                href="#forTeachers"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#forTeachers')?.scrollIntoView({ behavior: 'smooth' });
                  handleTabClick('teachers');
                }}
                className={`relative px-4 py-2 font-[Poppins] text-lg font-bold text-white ${
                  activeTab === 'teachers'
                    ? "after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-8 after:-translate-x-1/2 after:rounded after:bg-white after:opacity-60 after:content-['']"
                    : ''
                }`}
              >
                Tanároknak
              </a>
            </li>
            <li>
              <a
                href="#forStudents"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#forStudents')?.scrollIntoView({ behavior: 'smooth' });
                  handleTabClick('students');
                }}
                className={`relative px-4 py-2 font-[Poppins] text-lg font-bold text-white ${
                  activeTab === 'students'
                    ? "after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-8 after:-translate-x-1/2 after:rounded after:bg-white after:opacity-60 after:content-['']"
                    : ''
                }`}
              >
                Diákoknak
              </a>
            </li>
            <li>
              <a
                href="/register"
                onClick={() => handleTabClick('/register')}
                className="cursor-pointer"
              >
                <ActionButton content="Csatlakozz ma!" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mobile-wrapper flex h-20 w-full items-center justify-between rounded-2xl md:hidden">
          <a
            href="/"
            className="font-shadow-lg w-full p-2 text-center font-[Pacifico] text-4xl font-bold text-white md:hidden"
          >
            Progressus.
          </a>
          <div
            id="menu"
            onClick={handleNav}
            className="absolute right-4 z-20 block rounded-xl p-2 text-white md:hidden"
          >
            {!isOpen ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
          </div>
        </div>

        <div
          id="dropDown"
          className={`fixed top-24 left-0 z-50 flex h-auto w-screen flex-col border-y border-y-[#A78FFF] duration-400 ease-in-out md:hidden ${
            isOpen ? 'hidden' : 'flex'
          }`}
        >
          <ul className="flex h-auto flex-col items-center">
            <li
              onClick={() => {
                handleTabClick('/progressus/home');
                handleNav();
              }}
              className="p-4 text-xl font-bold text-white"
            >
              <a href="/" className="border-b-gray-700 font-[Poppins]">
                Kezdőlap
              </a>
            </li>
            <li
              onClick={() => {
                handleTabClick('/progressus/login');
                handleNav();
              }}
              className="p-4 text-xl font-bold text-white"
            >
              <a href="#forTeachers" className="border-b-gray-700 font-[Poppins]">
                Tanároknak
              </a>
            </li>
            <li
              onClick={() => {
                handleTabClick('/progressus/register');
                handleNav();
              }}
              className="p-4 text-xl font-bold text-white"
            >
              <a href="#forStudents" className="font-[Poppins]">
                Diákoknak
              </a>
            </li>
            <li className="mb-4">
              <a href="/register" onClick={() => handleTabClick('/progressus/register')}>
                <ActionButton content="Csatlakozz ma!" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavbarTop;
