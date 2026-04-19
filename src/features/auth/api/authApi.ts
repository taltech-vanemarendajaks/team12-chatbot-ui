import { apiClient } from '../../../shared/services/apiClient.ts';
import { authEndpoints } from './endpoints';
import { isAxiosError } from 'axios';

export type AuthUser = {
    id: number;
    email: string;
    name: string;
    roleName: 'USER' | 'ADMIN';
};

export type LocalDevSecurity = {
    isSecurityEnabled: boolean;
};

function isAuthError(error: unknown): boolean {
    return isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403);
}

export async function fetchCurrentUser(): Promise<AuthUser | null> {
    try {
        const response = await apiClient.get<AuthUser>(authEndpoints.getCurrentUser);

        return response.data;
    } catch (error) {
        if (isAuthError(error)) {
            return null;
        }
        throw error;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        await apiClient.post<AuthUser>(authEndpoints.getLogout);
    } catch (error) {
        if (isAuthError(error)) {
            console.error(error);
        }
        throw error;
    }
}

export async function fetchLocalDevSecurityStatus(): Promise<LocalDevSecurity> {
    try {
        const response = await apiClient.get<LocalDevSecurity>(authEndpoints.getLocalDevSecurityStatus);

        return response.data;

    } catch (error) {
        throw error;
    }
}

export function getLoginPage() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const login = authEndpoints.getLogin;

    return `${baseUrl}${login}`;
}
