import { Lesson } from "./lesson.model";
import { User } from "./user.model";

export interface Course {
    id: number;
    title: string,
    description: string,
    ownerId: number,
    owner: string,
    lessons: Array<Lesson>,
    students: Array<User>,
}