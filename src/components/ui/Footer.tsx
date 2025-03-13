import "../../assets/fonts/fonts.css";

const Footer = () => {
    return (
        <footer className="w-full h-32 bg-[#1A0129] flex flex-col justify-center items-center">
            <h1 className="font-[Poppins] text-gray-400 font-normal text-lg">
                2025 <span className="text-2xl text-white font-[Pacifico]">Progressus.</span>™
            </h1>
            <p className="text-gray-600 font-[Poppins]">Fejlődj könnyen!</p>
        </footer>
    );
};

export default Footer;
