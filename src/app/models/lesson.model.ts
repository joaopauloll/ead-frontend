import { SafeResourceUrl } from "@angular/platform-browser";
export interface Lesson {
    id: number;
    title: string,
    description: string,
    link: string,
    order: number,
    courseId: number,
    course: string,
    linkSafe: SafeResourceUrl
}