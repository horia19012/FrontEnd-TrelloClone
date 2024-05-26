export interface User {
    id: number;
    username: string;
    fullName?: string;
    email?: string;
}

export interface Project {
    id: number;
    projectName: string;
    projectDescription: string;
    deadline: string;
    status: string;
    owner: User;
}