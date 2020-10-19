import { User } from '../models/user.interface';

export class RoleVlidator {
    isAdmin(user: User): boolean {
        return user.role === 'ADMIN';
    }

    isProfessional(user: User): boolean {
        return user.role === 'PROFESIONAL';
    }

    isPatient(user: User): boolean {
        return user.role === 'PACIENTE';
    }
}