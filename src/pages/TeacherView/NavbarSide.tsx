import { useState, useEffect, useMemo } from 'react';
import { MdMoreVert as More } from 'react-icons/md';
import { RiDashboardFill } from 'react-icons/ri';
import { FaBookJournalWhills } from 'react-icons/fa6';
import { MdCalendarMonth } from 'react-icons/md';
import { PiStudentFill } from 'react-icons/pi';
import { TbLogout } from 'react-icons/tb';
import { BsPersonLinesFill } from 'react-icons/bs';
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import '../../assets/fonts/fonts.css';
import { useAuth } from '../../contexts/AuthContext';

export default function NavbarSide() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const navItems = useMemo(
    () => [
      {
        id: 'dashboard',
        text: 'Kezdőlap',
        icon: <RiDashboardFill size={25} />,
        href: '/dashboard',
      },
      {
        id: 'subjects',
        text: 'Tantárgyak',
        icon: <FaBookJournalWhills size={25} />,
        href: '/subjects',
      },
      {
        id: 'lessons',
        text: 'Óráim',
        icon: <PiStudentFill size={25} />,
        href: '/lessons' },
      {
        id: 'calendar',
        text: 'Naptár',
        icon: <MdCalendarMonth size={25} />,
        href: '/calendar'
      },
    ],
    []
  );

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = navItems.find((item) => item.href === currentPath);
    setActiveItem(matchingItem ? matchingItem.id : '');
  }, [location.pathname, navItems]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <aside
      className={`fixed h-screen bg-[#1A0129] transition-all ${isOpen ? 'w-60' : 'w-20'}`}
      onClick={handleToggle}
    >
      <nav className="flex h-full flex-col border-r shadow-sm">
        <div className="flex items-center justify-between p-4 pb-4">
          <a
            href="/"
            className={`text-3xl text-white transition-all ${isOpen ? 'block' : 'hidden'} font-[Pacifico]`}
          >
            Progressus.
          </a>
          <button
            className="rounded-lg bg-[#240238] p-1.5 text-center text-white hover:bg-[#372243]"
            onClick={handleToggle}
          >
            {isOpen ? <LuChevronFirst size={24} /> : <LuChevronLast size={30} />}
          </button>
        </div>

        <ul className="flex-1 px-3 font-[Poppins]">
          {navItems.map((item) => (
            <div className="flex w-full justify-start" key={item.id}>
              <SideBarItem
                key={item.id}
                icon={item.icon}
                text={item.text}
                href={item.href}
                isActive={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
                isOpen={isOpen}
              />
            </div>
          ))}
        </ul>

        <div className="flex h-[25%] w-full flex-col items-start border-t p-3 font-[Poppins]">
          <ul className="w-full flex-1">
            <div className="flex w-full justify-start">
              <SideBarItem
                icon={<TbLogout size={25} />}
                text="Kijelentkezés"
                href={'/login'}
                isActive={activeItem === 'logout'}
                onClick={() => {
                  setActiveItem('logout');
                  logout();
                  navigate('/login');
                }}
                isOpen={isOpen}
              />
            </div>
            <div className="flex w-full justify-start">
              <SideBarItem
                icon={<BsPersonLinesFill size={25} />}
                text={'Profilom'}
                href={'/mypage'}
                isActive={activeItem === 'mypage'}
                onClick={() => setActiveItem('mypage')}
                isOpen={isOpen}
              />
            </div>
          </ul>
          <div className="flex items-center p-1">
            <img
              src={user?.profilePicture || 'https://via.placeholder.com/80'}
              alt="User"
              className="h-12 w-12 rounded-lg object-cover"
            />
            {isOpen && user && (
              <div className="ml-3 flex w-full items-center justify-between">
                <div className="leading-4">
                  <h4 className="font-semibold text-white">{user.fullName}</h4>
                  <span className="text-xs text-gray-400">{user.email}</span>
                </div>
                <More size={24} className="text-white" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SideBarItemProps {
  icon: JSX.Element;
  text: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  isOpen: boolean;
}

export function SideBarItem({ icon, text, href, isActive, onClick, isOpen }: SideBarItemProps) {
  return (
    <Link to={href} className="w-full">
      <li
        onClick={onClick}
        className={`relative mx-1 my-2 flex cursor-pointer items-center rounded-md p-2 transition-all ${
          isActive
            ? 'bg-gradient-to-tr from-purple-700 to-purple-500 font-bold text-purple-600'
            : 'hover:bg-[#3F1E64] hover:text-purple-500'
        } ${text === 'Kijelentkezés' ? 'text-red-600 hover:bg-red-900 hover:text-white' : 'text-white'}`}
      >
        <div className="ml-0.5 flex items-center justify-center transition-all">{icon}</div>
        <span
          className={`ml-3 truncate transition-all ${isOpen ? 'opacity-100' : 'invisible opacity-0'}`}
        >
          {text}
        </span>
      </li>
    </Link>
  );
}
