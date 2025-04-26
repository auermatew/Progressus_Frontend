export interface User {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    profilePicture?: string;
    description?: string;
    role: 'ROLE_TEACHER' | 'ROLE_STUDENT';
}