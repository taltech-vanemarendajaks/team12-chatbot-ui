export type RoleName = 'USER' | 'ADMIN';

export interface User {
    id: number;
    name: string;
    roleName: RoleName;
}
