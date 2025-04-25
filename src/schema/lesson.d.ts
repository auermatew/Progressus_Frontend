export interface TeacherClassLesson {
    id: number;
    startDate: string;
    endDate: string;
    teacherClass: {
      id: number;
      title: string;
      description: string;
      price: number;
      subjects: string[];
    };
    reserved: boolean;
  }