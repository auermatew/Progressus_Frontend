import { useState } from "react";
import { LuMenu as MenuIcon } from "react-icons/lu";
import { AiOutlineClose as CloseIcon } from "react-icons/ai";

const NavbarTop = () => {
    const [isOpen, setOpen] = useState(true);
    const handleNav = () => {
        setOpen(!isOpen);
    };
    return (
        <>
            <nav className="bg-gray-800 max-w-[1240px] h-20 flex justify-between items-center mx-auto px-4">
                <a
                    href="/progressus"
                    className="text-purple-400 font-bold text-2xl p-2 shadow-md w-full"
                >
                    Progressus.
                </a>
                <div className="md:flex hidden ">
                    <a
                        href="/progressus/home"
                        className="text-white font-bold text-lg py-2 px-4"
                    >
                        Főoldal
                    </a>
                    <a
                        href="/progressus/login"
                        className="text-white font-bold text-lg py-2 px-4"
                    >
                        Bejelentkezés
                    </a>
                    <a
                        href="/progressus/register"
                        className="text-white font-bold text-lg py-2 px-4"
                    >
                        Regisztrálás
                    </a>
                </div>
                <div onClick={handleNav} className="text-white block md:hidden z-20">
                    {!isOpen ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
                </div>
                <div
                    className={`fixed md:hidden right-0 top-20 w-[40%] h-auto bg-gray-800 z-50 border-l-gray-700 flex flex-col duration-400 ease-in-out ${
                        !isOpen ? "flex" : "fixed right-[-100%]"
                    }`}
                >
                    <ul className="flex flex-col h-auto items-end">
                        <li className="text-white font-bold text-lg p-2">
                            <a
                                href="/progressus/home"
                                className="border-b-gray-700 p-4"
                            >
                                Főoldal
                            </a>
                        </li>
                        <li className="text-white font-bold text-lg p-2">
                            <a
                                href="/progressus/login"
                                className="border-b-gray-700 p-4"
                            >
                                Bejelentkezés
                            </a>
                        </li>
                        <li className="text-white font-bold text-lg p-2 mb-4">
                            <a href="/progressus/register" className="p-4">
                                Regisztrálás
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavbarTop;
