import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from 'react';
import { Transaction } from '../schema/transaction';
import { TransactionApiService } from '../api/TransactionApiService';

interface TransactionContextType {
  incomingTransactions: Transaction[];
  outgoingTransactions: Transaction[];
  fetchIncoming: () => Promise<void>;
  fetchOutgoing: () => Promise<void>;
  acceptTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType>({
  incomingTransactions: [],
  outgoingTransactions: [],
  fetchIncoming: async () => {},
  fetchOutgoing: async () => {},
  acceptTransaction: async () => {},
});

export const useTransaction = () => useContext(TransactionContext);

const TransactionProvider = ({ children }: PropsWithChildren) => {
  const [incomingTransactions, setIncoming] = useState<Transaction[]>([]);
  const [outgoingTransactions, setOutgoing] = useState<Transaction[]>([]);

  const fetchIncoming = useCallback(async () => {
    const data = await TransactionApiService.getIncoming();
    setIncoming(data);
  }, []);

  const fetchOutgoing = useCallback(async () => {
    const data = await TransactionApiService.getOutgoing();
    setOutgoing(data);
  }, []);

  const acceptTransaction = useCallback(
    async (id: string) => {
      await TransactionApiService.acceptTransaction(id);
      await fetchIncoming();
    },
    [fetchIncoming]
  );

  useEffect(() => {
    fetchIncoming();
    fetchOutgoing();
  }, [fetchIncoming, fetchOutgoing]);

  return (
    <TransactionContext.Provider
      value={{
        incomingTransactions,
        outgoingTransactions,
        fetchIncoming,
        fetchOutgoing,
        acceptTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
