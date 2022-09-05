import { User } from "./user.model";

export interface userResponse {
    user: User;
    token: string;
}