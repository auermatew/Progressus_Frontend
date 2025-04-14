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
  createSubjects: (subjects: { subject: string; isVerified: boolean }[]) => Promise<void | AxiosError<ApiError>>;
  editSubject: (id: string, data: { subject: string; isVerified: boolean }) => Promise<void | AxiosError<ApiError>>;
  deleteSubject: (id: string) => Promise<void | AxiosError<ApiError>>;
  getSubjectById: (id: string) => Promise<Subject | undefined>;
}

const SubjectContext = createContext<SubjectContextType>({
  subjects: [],
  setSubjects: () => {},
  createSubjects: () => Promise.resolve(),
  editSubject: () => Promise.resolve(),
  deleteSubject: () => Promise.resolve(),
  getSubjectById: () => Promise.resolve(undefined),
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

  const createSubjects = useCallback(
    async (subjectsList: { subject: string; isVerified: boolean }[]) => {
      try {
        await SubjectApiService.create({ subjects: subjectsList });
        await getSubjects();
      } catch (error) {
        console.error('Error creating subjects:', error);
        return error as AxiosError<ApiError>;
      }
    },
    [getSubjects]
  );

  const editSubject = useCallback(
    async (id: string, data: { subject: string; isVerified: boolean }) => {
      try {
        await SubjectApiService.edit(id, data);
        await getSubjects();
      } catch (error) {
        console.error('Error editing subject:', error);
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

  const getSubjectById = useCallback(async (id: string) => {
    try {
      return await SubjectApiService.getById(id);
    } catch (error) {
      console.error('Error fetching subject by ID:', error);
    }
  }, []);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        setSubjects,
        createSubjects,
        editSubject,
        deleteSubject,
        getSubjectById,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectProvider;
