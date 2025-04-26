import NavbarSide from './NavbarSide';
import TeacherRequests from '../../components/TeacherRequests';
import Footer from '../../components/ui/Footer';
import '../../assets/fonts/fonts.css';
import './_teacherStyle.css';

const DashboardPage = () => {
  return (
    <>
      <NavbarSide />
      <div className="page-wrapper min-h-screen w-screen bg-gradient-to-b from-black to-[#1A1A1A] pt-4 pr-6 pb-20 pl-24 text-white">
        <h1 className="mb-6 font-[Poppins] text-4xl font-bold">Kezdőlap</h1>

        <div className="mb-4">
          <TeacherRequests />
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
