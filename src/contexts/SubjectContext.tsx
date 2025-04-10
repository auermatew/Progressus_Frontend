import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Subject } from '../schema/subject';
import { AxiosError } from 'axios';
import { ApiError } from '../schema/api';
import { SubjectApiService } from '../api/SubjectApiService';

interface SubjectContextType {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
  createSubject: (data: {
    name: string;
    isVerified: boolean;
  }) => Promise<void | AxiosError<ApiError>>;
  deleteSubject: (id: string) => Promise<void | AxiosError<ApiError>>;
}

const SubjectContext = createContext<SubjectContextType>({
  subjects: [],
  setSubjects: () => {},
  createSubject: () => Promise.resolve(),
  deleteSubject: () => Promise.resolve(),
});

export const useSubject = () => useContext(SubjectContext);

const SubjectProvider = ({ children }: PropsWithChildren) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const getSubjects = useCallback(async () => {
    try {
      const data = await SubjectApiService.getAll();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  }, []);

  const createSubject = useCallback(
    async (data: { name: string; isVerified: boolean }) => {
      try {
        await SubjectApiService.create(data);
        await getSubjects();
      } catch (error) {
        console.error('Error creating subject:', error);
        return error as AxiosError<ApiError>;
      }
    },
    [getSubjects]
  );

  const deleteSubject = useCallback(
    async (id: string) => {
      try {
        await SubjectApiService.delete(id);
        await getSubjects();
      } catch (error) {
        console.error('Error deleting subject:', error);
        return error as AxiosError<ApiError>;
      }
    },
    [getSubjects]
  );

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        setSubjects,
        createSubject,
        deleteSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectProvider;
