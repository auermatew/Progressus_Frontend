import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#1A0129] text-white font-[Poppins] px-4">
      <h1 className="text-5xl font-bold mb-4 text-red-500">403 - Hozzáférés megtagadva</h1>
      <p className="text-lg text-gray-300 mb-6 text-center max-w-[600px]">
        Sajnáljuk, de nincs jogosultságod az oldal megtekintéséhez. Lehetséges, hogy be kell jelentkezned vagy nincs megfelelő szerepköröd.
      </p>
      <Link to="/" className="rounded-xl bg-[#7B07FF] px-6 py-3 text-lg hover:opacity-80 transition">
        Vissza a főoldalra
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
