import { useState, useEffect } from "react";
import { LuMenu as MenuIcon } from "react-icons/lu";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";
import ActionButton from "./ActionButton";
import '../../styles/navbarTop.css';
import '../../assets/fonts/fonts.css';

const NavbarTop = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("/progressus/home");

    useEffect(() => {
      const storedTab = localStorage.getItem("activeTab");
      if (storedTab) setActiveTab(storedTab);
    }, []);

    const handleNav = () => {
        setIsOpen(!isOpen);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        localStorage.setItem("activeTab", tab);
    };

    return (
        <>
            <nav className=" md:w-[80%] h-20 flex justify-between items-center mx-auto px-4 my-4 rounded-xl fixed top-0 w-full md:left-[10%]">
                <div className="md:flex hidden w-full">
                    <ul className="flex items-center justify-evenly w-full">
                        <li>
                            <a
                                href="/progressus"
                                className="text-white font-[Pacifico] font-bold p-2 w-full md:text-3xl text-center leading-6"
                            >
                                Progressus.
                            </a>
                        </li>
                        <li onClick={() => handleTabClick("/progressus/home")}>
                            <a
                                href="/progressus/home"
                                className={`text-white font-[Poppins] font-bold text-lg py-2 px-4 relative ${
                                    activeTab === "/progressus/home" ? "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-[3px] after:w-8 after:bg-white after:opacity-60 after:rounded" : ""
                                }`}
                            >
                                Kezdőlap
                            </a>
                        </li>
                        <li onClick={() => handleTabClick("/progressus/login")}>
                            <a
                                href="/progressus/login"
                                className={`text-white font-[Poppins] font-bold text-lg py-2 px-4 relative ${
                                    activeTab === "/progressus/login" ? "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-[3px] after:w-8 after:bg-white after:opacity-60 after:rounded" : ""
                                }`}
                            >
                                Tanároknak
                            </a>
                        </li>
                        <li onClick={() => handleTabClick("/progressus/register")}>
                            <a
                                href="/progressus/register"
                                className={`text-white font-[Poppins] font-bold text-lg py-2 px-4 relative ${
                                    activeTab === "/progressus/register" ? "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:h-[3px] after:w-8 after:bg-white after:opacity-60 after:rounded" : ""
                                }`}
                            >
                                Diákoknak
                            </a>
                        </li>
                        <li>
                            <a href="/progressus/register" onClick={() => handleTabClick("/progressus/register")} className="cursor-pointer">
                                <ActionButton content="Csatlakozz ma!" />
                            </a>
                        </li>
                    </ul>
                </div>

                <a
                    href="/progressus"
                    className="text-white font-[Pacifico] font-bold text-4xl p-2 w-full text-center font-shadow-lg md:hidden"
                >
                    Progressus.
                </a>
                <div id="menu"
                    onClick={handleNav}
                    className="text-white block md:hidden z-20 p-2 rounded-xl absolute right-4"
                >
                    {!isOpen ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
                </div>

                <div
                    className={`fixed md:hidden right-0 top-24 w-full h-auto bg-[#4F1294] z-50 border-y border-y-[#A78FFF] flex flex-col duration-400 ease-in-out ${
                        !isOpen ? "flex" : "fixed right-[-100%]"
                    }`}
                >
                    <ul className="flex flex-col h-auto items-center">
                        <li onClick={() => handleTabClick("/progressus/home")} className="text-white font-bold text-xl p-4">
                            <a
                                href="/progressus/home"
                                className="border-b-gray-700 font-[Poppins]"
                            >
                                Kezdőlap
                            </a>
                        </li>
                        <li onClick={() => handleTabClick("/progressus/login")} className="text-white font-bold text-xl p-4">
                            <a
                                href="/progressus/login"
                                className="border-b-gray-700 font-[Poppins]"
                            >
                                Tanároknak
                            </a>
                        </li>
                        <li onClick={() => handleTabClick("/progressus/register")} className="text-white font-bold text-xl p-4">
                            <a href="/progressus/register" className="font-[Poppins]">
                                Diákoknak
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="/progressus/register" onClick={() => handleTabClick("/progressus/register")}>
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
