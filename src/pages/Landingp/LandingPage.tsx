// Landing page for the application
import React from "react";
import Navbar from "../../components/ui/NavbarTop";

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <div className="wrapper w-full h-10">
                <h1 className="text-center text-black text-3xl font-bold ">
                    Landing Page
                </h1>
            </div>
        </>
    );
};

export default LandingPage;
