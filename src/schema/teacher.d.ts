export interface Subject {
    id: number;
    name: string;
}

export interface Teacher {
    id: number;
    fullName: string;
    profilePicture: string;
    bio: string;
    available: boolean;
    subjects: Subject[];
}

export interface CreateTeacherDto {
    bio: string;
    subjects: string[];
}

export interface EditTeacherDto {
    bio: string;
    available: boolean;
    profilePicture?: string;
}