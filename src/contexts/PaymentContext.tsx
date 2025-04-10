import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from 'react';
import { BillingDetails } from '../schema/payment';
import { AxiosError } from 'axios';
import { ApiError } from '../schema/api';
import { PaymentApiService } from '../api/PaymentApiService';

interface PaymentContextType {
  billingDetails: BillingDetails | null;
  setBillingDetails: React.Dispatch<React.SetStateAction<BillingDetails | null>>;
  fetchBillingDetails: () => Promise<void>;
  createBillingDetails: (body: BillingDetails) => Promise<void | AxiosError<ApiError>>;
}

const PaymentContext = createContext<PaymentContextType>({
  billingDetails: null,
  setBillingDetails: () => {},
  fetchBillingDetails: async () => {},
  createBillingDetails: async () => {},
});

export const usePayment = () => useContext(PaymentContext);

const PaymentProvider = ({ children }: PropsWithChildren) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);

  const fetchBillingDetails = useCallback(async () => {
    try {
      const data = await PaymentApiService.getForCurrentUser();
      setBillingDetails(data);
    } catch (error) {
      console.error('Failed to fetch billing details:', error);
    }
  }, []);

  const createBillingDetails = useCallback(async (body: BillingDetails) => {
    try {
      const data = await PaymentApiService.create(body);
      setBillingDetails(data);
    } catch (error) {
      console.error('Error creating billing details:', error);
      return error as AxiosError<ApiError>;
    }
  }, []);

  useEffect(() => {
    fetchBillingDetails();
  }, [fetchBillingDetails]);

  return (
    <PaymentContext.Provider
      value={{
        billingDetails,
        setBillingDetails,
        fetchBillingDetails,
        createBillingDetails,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
