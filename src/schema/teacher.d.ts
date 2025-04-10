export interface Subject {
    id: number;
    name: string;
}

export interface Teacher {
    id: number;
    name: string;
    subjects: Subject[];
}

