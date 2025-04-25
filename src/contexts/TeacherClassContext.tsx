import React, { createContext, useContext, useState, useCallback, PropsWithChildren } from 'react';
import { TeacherClass } from '../schema/teacherClass';
import { TeacherClassApiService } from '../api/TeacherClassApiService';

interface TeacherClassContextType {
  classes: TeacherClass[];
  fetchClasses: (teacherId: number) => Promise<void>;
  setClasses: React.Dispatch<React.SetStateAction<TeacherClass[]>>;
}

const TeacherClassContext = createContext<TeacherClassContextType>({
  classes: [],
  fetchClasses: async () => {},
  setClasses: () => {},
});

export const useTeacherClass = () => useContext(TeacherClassContext);

const TeacherClassProvider = ({ children }: PropsWithChildren) => {
  const [classes, setClasses] = useState<TeacherClass[]>([]);

  const fetchClasses = useCallback(async (teacherId: number) => {
    try {
      const data = await TeacherClassApiService.getByTeacherId(teacherId);
      setClasses(data);
    } catch (err) {
      console.error('Error fetching teacher classes:', err);
    }
  }, []);

  return (
    <TeacherClassContext.Provider value={{ classes, fetchClasses, setClasses }}>
      {children}
    </TeacherClassContext.Provider>
  );
};

export default TeacherClassProvider;
