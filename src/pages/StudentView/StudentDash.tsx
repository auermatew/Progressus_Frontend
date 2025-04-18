import React from 'react';
import NavbarSideSt from './NavbarSideSt';
import Footer from '../../components/ui/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { usePayment } from '../../contexts/PaymentContext';
import { useTransaction } from '../../contexts/TransactionContext';

const StudentDash = () => {
  const { user } = useAuth();
  const { billingDetails } = usePayment();
  const { outgoingTransactions } = useTransaction();

  return (
    <>
      <NavbarSideSt />
      <div className="wrapper min-h-screen w-full pl-24 pr-6 pt-6 pb-12 text-white bg-gradient-to-b from-black to-[#1A1A1A] font-[Poppins]">
        <h1 className="text-4xl font-bold mb-6">Üdvözlünk, {user?.fullName}!</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Fiók információk</h2>
            <p><span className="text-gray-400">Email:</span> {user?.email}</p>
            <p><span className="text-gray-400">Szerepkör:</span> {user?.role === 'STUDENT' ? 'Diák' : user?.role}</p>
          </div>

          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Számlázási cím</h2>
            {billingDetails ? (
              <>
                <p>{billingDetails.address_street}</p>
                <p>{billingDetails.address_zip} {billingDetails.address_city}</p>
                <p>{billingDetails.address_country}</p>
              </>
            ) : (
              <p className="text-gray-400">Nincs számlázási adat</p>
            )}
          </div>

          <div className="rounded-xl bg-[#2B0A3D] p-6 shadow-md">
            <h2 className="text-lg font-semibold mb-2">Legutóbbi tranzakciók</h2>
            {outgoingTransactions?.length > 0 ? (
              <ul className="text-sm list-disc list-inside">
                {outgoingTransactions.slice(0, 3).map((tx) => (
                  <li key={tx.id}>
                    {new Date(tx.date).toLocaleString()} – {tx.billingDetails.amount} {tx.billingDetails.currency}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">Nincs elérhető tranzakció</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StudentDash;
