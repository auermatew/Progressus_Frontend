export interface Subject {
    id: number;
    name: string;
}

export interface Teacher {
    id: number;
    name: string;
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