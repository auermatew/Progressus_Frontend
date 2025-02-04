// Landing page for the application
import React from "react";
import Navbar from "../../components/ui/NavbarTop";
import userIcon from "../../assets/images/userIcons.png";
import ActionButton from "../../components/ui/ActionButton";

const LandingPage = () => {
    return (
        <div className="bg-custom-radial min-h-screen">
            <Navbar />
            <div className="wrapper w-screen h-full flex flex-col justify-center items-center p-12">
                <div className="users h-12 w-[95%] md:w-auto mx-auto border-2 border-[#7B07FF] flex flex-row rounded-4xl justify-center items-center px-4 md:p-4">
                    <img src={userIcon} alt="users" className="h-8 md:h-12 mr-4 md:mr-2 ml-[-0.875rem]" />
                    <p className="font-[Poppins] text-sm md:text-lg text-white opacity-75">
                        20.000+ elégedett felhasználó
                    </p>
                </div>
                <div className="heading p-4 w-full md:w-[800px] text-center">
                    <h1 className="font-bold text-5xl md:text-7xl font-[Poppins]
                    inline-block leading-16 md:leading-20 text-transparent bg-clip-text
                    bg-gradient-to-r from-[#999999] via-white to-[#999999]">
                        Találd meg <br />a hozzád illő tanárt
                    </h1>
                </div>
                <div className="subHeading p-2 w-screen md:w-[800px] text-center">
                    <h2 className="text-white text-lg md:text-2xl font-[Poppins]">
                        Böngéssz több, mint 10.000 megbízható magántanár közül,
                        akik csak arra várnak, hogy elérd a célod.
                    </h2>
                </div>
                <div className="action-div p-4">
                    <a href="" className="cursor-pointer">
                        <ActionButton content="Tudj meg többet!" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
