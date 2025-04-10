import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
  useEffect,
} from 'react';
import { Subject, Teacher } from '../schema/teacher';
import { ApiError } from '../schema/api';
import { AxiosError } from 'axios';
import { TeacherApiService } from '../api/TeacherApiService';

interface TeacherContextType {
  teachers: Teacher[];
  bySubject: Subject[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  setBySubject: React.Dispatch<React.SetStateAction<Subject[]>>;
  createTeacher: (body: object) => Promise<void | AxiosError<ApiError>>;
  deleteTeacher: (id: string) => Promise<void | AxiosError<ApiError>>;
}

const TeacherContext = createContext<TeacherContextType>({
  teachers: [],
  bySubject: [],
  setTeachers: () => {},
  setBySubject: () => {},
  createTeacher: () => Promise.resolve(),
  deleteTeacher: () => Promise.resolve(),
});

export const useTeacher = () => useContext(TeacherContext);

const TeacherProvider = ({ children }: PropsWithChildren) => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [bySubject, setBySubject] = useState<Subject[]>([]);

  const getTeachers = useCallback(async () => {
    try {
      const data = await TeacherApiService.get();
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  }, []);

  const getBySubject = useCallback(async () => {
    try {
      const data = await TeacherApiService.get();
      setBySubject(data);
    } catch (error) {
      console.error('Error fetching teachers by subject:', error);
    }
  }, []);

  const createTeacher = useCallback(
    async (body: object) => {
      try {
        await TeacherApiService.post(body as Teacher);
        await getTeachers();
      } catch (error) {
        console.error('Error creating teacher:', error);
        return error as AxiosError<ApiError>;
      }
    },
    [getTeachers, getBySubject]
  );

  const deleteTeacher = useCallback(
    async (id: string) => {
      try {
        await TeacherApiService.delete(id);
        await getTeachers();
      } catch (error) {
        console.error('Error deleting teacher:', error);
        return error as AxiosError<ApiError>;
      }
    },
    [getTeachers, getBySubject]
  );

  useEffect(() => {
    getTeachers();
    getBySubject();
  }, [getTeachers, getBySubject]);

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        bySubject,
        setTeachers,
        setBySubject,
        createTeacher,
        deleteTeacher,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export default TeacherProvider;
