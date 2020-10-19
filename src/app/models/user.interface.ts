import { Role } from './roles.types';

export interface User {
    uid: string;
    email: string;
    password?: string;
    emailVerified?: boolean;
    role?: Role;
}