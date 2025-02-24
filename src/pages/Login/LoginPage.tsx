// Login page content

import { FaLock as LockIcon, FaUser as UserIcon } from "react-icons/fa";
import Navbar from "../../components/ui/NavbarTop";
import ActionButton from "../../components/ui/ActionButton";
import Input from "../../components/form/input";
import "./login.css";
// import Teacher from "../../assets/images/teacher.jpg";
import Footer from "../../components/ui/Footer";

const LoginPage = () => {
    return (
        <>
            <Navbar />
            <div className="wrapper w-screen h-screen flex flex-1 flex-col md:flex-row justify-center items-center">
                <div className="side-text w-[50%] h-[100%] hidden md:flex justify-center items-center">
                    {/* <img src={Teacher} className="rounded-4xl shadow-2xl w-[60%] h-[60%]" /> */}
                    {/* Valami */}
                </div>
                <div className="login-form flex flex-col justify-center items-center w-full h-full md:w-[50%] md:h-[100%]">
                    <div
                        className="
                            form-wrapper w-[90%] md:w-[60%] h-[60%] flex flex-col justify-center items-center border-white border-4 rounded-3xl z-10
                        "
                    >
                        <h1 className="font-[Poppins] font-bold text-5xl p-8 md:p-4 text-transparent bg-clip-text bg-radial from-white to-[#999999]">
                            Belépés
                        </h1>
                        <form className="flex flex-col w-[100%] justifiy-center items-center">
                            <div className="input-wrapper w-[90%] md:w-[80%] m-4 flex flex-row items-center border-b-2 border-white px-4">
                                <UserIcon
                                    size={20}
                                    className="text-white block left-6"
                                />
                                <Input
                                    id="unInput"
                                    type="text"
                                    placeholder="Felhasználónév"
                                />
                            </div>
                            <div className="input-wrapper w-[90%] md:w-[80%] m-4 md:mb-4 flex flex-row items-center border-b-2 border-white px-4">
                                <LockIcon
                                    size={20}
                                    className="text-white block right-6"
                                />
                                <Input
                                    id="pwInput"
                                    type="password"
                                    placeholder="Jelszó"
                                />
                            </div>
                            <div className="forgot w-[80%] justify-end items-center flex">
                                <a
                                    href="https://i.pinimg.com/736x/be/d9/2c/bed92cdaa8c3880d5fe77735bb8fecea.jpg"
                                    className="text-white hover:underline"
                                >
                                    Elfelejtett jelszó?
                                </a>
                            </div>
                        </form>
                        <div className="submit p-4 w-full mb-8 md:mb-0 flex justify-center items-center">
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
