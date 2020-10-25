import { Role } from './roles.types';

export interface User {
    uid: string;
    email: string;
    name?: string;
    password?: string;
    emailVerified?: boolean;
    role?: Role;
    img1?: string;
    img2?: string;
}