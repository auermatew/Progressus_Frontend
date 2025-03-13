// Landing page for the application

import Navbar from '../../components/ui/NavbarTop';
import ActionButton from '../../components/ui/ActionButton';
import Footer from '../../components/ui/Footer';
import './landingPage.css';

import userIcon from './img/userIcons.png';
import Logo from '../../assets/images/logo.png';
import Energy from './img/energy-head.png';
import Heart from './img/heart-head.png';
import Tick from './img/tick-head.png';
import Teacher from './img/teacher.png';
import Trello from './img/trello.png';
import Microsoft from './img/microsoft.png';
import Paypal from './img/paypal.png';
import Drive from './img/drive.png';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="wrapper flex w-screen flex-1 flex-col items-center justify-center px-12">
        <section id="hero" className="hero h-[100vh] w-screen">
          <div className="flex h-full w-auto flex-col items-center justify-center">
            <div className="users mx-auto flex h-12 w-auto flex-row items-center justify-center rounded-4xl border-2 border-[#7B07FF] px-4 md:w-auto md:p-4">
              <img src={userIcon} alt="users" className="mr-4 ml-[-0.875rem] h-8 md:mr-2 md:h-12" />
              <p className="z-[1] font-[Poppins] text-sm text-white opacity-75 md:text-lg">
                20.000+ elégedett felhasználó
              </p>
            </div>
            <div className="heading w-full p-4 text-center md:w-[800px]">
              <h1 className="inline-block bg-radial from-white to-[#999999] bg-clip-text font-[Poppins] text-5xl leading-16 font-bold text-transparent md:text-7xl md:leading-20">
                Találd meg <br />a hozzád illő tanárt
              </h1>
            </div>
            <div className="subHeading w-screen p-2 text-center md:w-[800px]">
              <h2 className="font-[Poppins] text-lg text-white md:text-2xl">
                Böngéssz több, mint 10.000 megbízható magántanár közül, akik csak arra várnak, hogy
                elérd a célod.
              </h2>
            </div>
            <div className="action-div p-4">
              <a href="/register">
                <ActionButton content="Tudj meg többet!" />
              </a>
            </div>
          </div>
        </section>
        <section className="infos">
          {/* Section containing statistics */}
          <div className="wrapper flex w-screen flex-row justify-evenly bg-[#1A0129] py-6 font-[Poppins]">
            <div className="row flex w-[50%] flex-col items-center justify-evenly md:flex-row">
              <div className="flex w-auto flex-col items-center justify-center p-4">
                <p className="text-xl font-bold text-white md:text-3xl">10.000+</p>
                <p className="text-sm text-gray-400 md:text-lg">Tanár</p>
              </div>
              <div className="flex w-auto flex-col items-center justify-center p-4">
                <p className="text-xl font-bold text-white md:text-3xl">80+</p>
                <p className="text-sm text-gray-400 md:text-lg">Témakör</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img src={Logo} className="h-16 w-16" />
            </div>
            <div className="row flex w-[50%] flex-col items-center justify-evenly md:flex-row">
              <div className="flex w-auto flex-col items-center justify-center p-4">
                <p className="text-lg font-bold text-white md:text-3xl">10.000+</p>
                <p className="text-sm text-gray-400 md:text-lg">Diák</p>
              </div>
              <div className="flex w-auto flex-col items-center justify-center p-4">
                <p className="text-lg font-bold text-white md:text-3xl">24/7</p>
                <p className="text-sm text-gray-400 md:text-lg">Ügyfélszolgálat</p>
              </div>
            </div>
          </div>
        </section>
        <section id="forTeachers" className="for-teachers font-[Poppins]">
          {/* Section advertising for teachers */}
          <div className="wrapper flex h-auto w-screen flex-col py-16">
            <div className="flex w-[100%] flex-col md:flex-row">
              <div className="left items-evenly flex h-auto w-screen flex-col justify-center text-center md:m-8 md:w-[50%] md:pl-6 md:text-start">
                <h1 className="bg-radial from-white to-[#999999] bg-clip-text p-2 text-3xl font-bold text-transparent md:text-6xl">
                  Taníts szenvedéllyel, <br /> érj el több diákot
                </h1>
                <div className="text-row m-8 flex flex-col items-center justify-items-start rounded-3xl md:flex-row">
                  <img src={Energy} />
                  <div className="flex flex-col p-4">
                    <p className="text-lg text-white md:text-2xl">
                      Magántanárnak lenni nem egyszerű.
                    </p>
                    <p className="text-lg text-white md:text-2xl">
                      Diákok keresése, időpontok egyeztetése...
                    </p>
                  </div>
                </div>
                <div className="text-row m-8 flex flex-col items-center justify-items-start rounded-3xl md:flex-row">
                  <img src={Heart} />
                  <div className="flex flex-col p-4">
                    <p className="text-lg text-white md:text-2xl">
                      A tanítás szenvedély és hivatás.
                    </p>
                    <p className="text-lg text-white md:text-2xl">
                      Ne az adminisztráció szabjon gátat benne.
                    </p>
                  </div>
                </div>
                <div className="text-row m-8 flex flex-col items-center justify-items-start rounded-3xl md:flex-row">
                  <img src={Tick} />
                  <div className="flex flex-col p-4">
                    <p className="text-lg text-white md:text-2xl">
                      Szabd testre a profilod, mutatkozz be
                    </p>
                    <p className="text-lg text-white md:text-2xl">
                      Hagyd, hogy a diákok könnyedén rád találjanak.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-[100%] items-center justify-center pb-8 md:hidden">
                <a href="/register">
                  <ActionButton content="Regisztrálok tanárként" />
                </a>
              </div>
              <div className="right hidden flex-col items-center justify-center md:flex md:w-[50%]">
                <img src={Teacher} alt="Tanár" className="m-8 rounded-4xl" />
                <a href="/register">
                  <ActionButton content="Regisztrálok tanárként" />
                </a>
              </div>
            </div>
            <div className="bottom flex h-auto w-screen items-center justify-center">
              <div className="mx-2 rounded-4xl border-2 border-[#7B07FF] px-4 py-2">
                <p className="text-center text-gray-300">
                  <span className="font-bold text-white md:text-sm">
                    “Mit ér a tudás, ha nem adhatjuk tovább az arra érdemeseknek?”
                  </span>{' '}
                  - John Cure
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="sponsors font-[Poppins] h-auto w-screen bg-[#1A0129] p-4">
          {/* Section containing partner companys */}
          <div className="headline flex h-[10%] w-full items-center justify-center">
            <p className="text-xl text-white">Partnereink:</p>
          </div>
          <div className="wrapper mb-4 flex h-[90%] w-full flex-row items-center justify-evenly">
            <div className="column align-center flex flex-col md:flex-row w-[50%] justify-evenly">
              <div className="sponsor items-center flex justify-center md:w-[15%]">
                <img src={Trello} alt="" className="m-2 h-16 md:h-20" />
              </div>
              <div className="sponsor items-center flex justify-center md:w-[15%]">
                <img src={Microsoft} alt="" className="m-2 h-16 md:h-20" />
              </div>
            </div>
            <div className="column items-center flex flex-col md:flex-row w-[50%] justify-evenly">
              <div className="sponsor items-center flex justify-center md:w-[15%]">
                <img src={Paypal} alt="" className="m-2 h-16 md:h-20" />
              </div>
              <div className="sponsor items-center flex justify-center md:w-[15%]">
                <img src={Drive} alt="" className="m-2 h-16 md:h-20" />
              </div>
            </div>
          </div>
        </section>
        <section id="forStudents" className="font-[Poppins]">
          {/* Section advertising for students */}
          <div className="wrapper flex h-screen w-screen flex-col py-16">
            <div className="flex w-[100%] flex-col md:flex-row">{/* For students */}</div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
