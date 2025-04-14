export interface User {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    profilePicture?: string;
    description?: string;
    role: 'TEACHER' | 'STUDENT';
}