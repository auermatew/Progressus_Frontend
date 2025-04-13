export interface RegisterValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'TEACHER' | 'STUDENT';
  }