import React from 'react';
import NavbarSide from './NavbarSide';
import Footer from '../../components/ui/Footer';
import './_teacherStyle.css';
import List from '../../components/ListTeacher';

const MyPage = () => {
  return (
    <>
      <NavbarSide />
      <div className="page-wrapper h-screen w-screen pt-4 pl-24">
        <h1 className="font-[Poppins] text-4xl font-bold text-white">Saját profilom</h1>
        <div className="teacher-list mt-8 flex h-full w-full flex-col items-center justify-start overflow-auto text-white">
          <List />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
