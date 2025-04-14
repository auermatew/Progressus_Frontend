import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from 'react';
import { BillingDetails } from '../schema/payment';
import { PaymentApiService } from '../api/PaymentApiService';

interface PaymentContextType {
  billingDetails: BillingDetails | null;
  fetchBillingDetails: () => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType>({
  billingDetails: null,
  fetchBillingDetails: async () => {},
});

export const usePayment = () => useContext(PaymentContext);

const PaymentProvider = ({ children }: PropsWithChildren) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);

  const fetchBillingDetails = useCallback(async () => {
    try {
      const data = await PaymentApiService.getMyBillingDetails();
      setBillingDetails(data);
    } catch (error) {
      console.error('Error fetching billing details:', error);
    }
  }, []);

  useEffect(() => {
    fetchBillingDetails();
  }, [fetchBillingDetails]);

  return (
    <PaymentContext.Provider value={{ billingDetails, fetchBillingDetails }}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
