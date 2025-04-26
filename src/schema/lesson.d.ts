import { TeacherClass } from "./teacherClass";
export interface TeacherClassLesson {
    id: number;
    startDate: string;
    endDate: string;
    teacherClass: TeacherClass;
    reserved: boolean;
    lessonReservations: LessonReservation[];
  }

  export interface LessonReservation {
    id: number;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    user: {
      fullName: string;
    };
  }