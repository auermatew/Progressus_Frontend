import { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';
import { LessonApiService } from '../api/LessonApiService';
import { useAuth } from './AuthContext';
import { TeacherClassLesson } from '../schema/lesson';

export interface Lesson {
  id: number;
  start_date: string;
  end_date: string;
  teacherClass: {
    id: number;
    subject: string;
    className: string;
  };
  lessonReservations: {
    user: {
      fullName: string;
    };
    status: string;
  }[];
}

interface LessonContextType {
  lessons: TeacherClassLesson[];
  fetchLessons: () => Promise<void>;
}

const LessonContext = createContext<LessonContextType>({
  lessons: [],
  fetchLessons: async () => {},
});

export const useLesson = () => useContext(LessonContext);

const LessonProvider = ({ children }: PropsWithChildren) => {
  const [lessons, setLessons] = useState<TeacherClassLesson[]>([]);
  const { user } = useAuth();

  const fetchLessons = useCallback(async () => {
    if (!user) return;

    const startDate = new Date().toISOString();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const data = await LessonApiService.getLessonsByCalendar(
      user.id,
      startDate,
      endDate.toISOString()
    );

    setLessons(data);
  }, [user]);

  return (
    <LessonContext.Provider value={{ lessons, fetchLessons }}>{children}</LessonContext.Provider>
  );
};

export default LessonProvider;
