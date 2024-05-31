// models.ts
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

export interface Task {
    id: number;
    taskName: string;
    taskDescription: string;
    deadline: Date;
    priority: string;
    status: string;
    assignedToUser?: User;
    project: Project;
}
