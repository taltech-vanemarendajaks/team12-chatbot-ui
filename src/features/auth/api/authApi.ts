import { apiClient } from '../../../shared/services/apiClient.ts';
import { authEndpoints } from './endpoints';
import { isForbiddenError, isUnauthorizedError } from '@/shared/services/apiError';

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
    return isUnauthorizedError(error) || isForbiddenError(error);
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
        await apiClient.post(authEndpoints.getLogout);
    } catch (error) {
        if (isAuthError(error)) {
            return;
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

export function getLoginPage(): string {
    return authEndpoints.getLogin;
}

