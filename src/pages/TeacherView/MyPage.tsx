import React from 'react';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import './_teacherStyle.css';

const MyPage = () => {
  return (
    <>
      <NavbarSide />
      <div className="page-wrapper h-screen w-screen pt-4 pl-24">
        <h1 className="font-[Poppins] text-4xl font-bold text-white">Saját profilom</h1>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
