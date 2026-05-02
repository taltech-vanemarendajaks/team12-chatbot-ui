import { isAxiosError } from 'axios';

export function getApiErrorStatus(error: unknown): number | null {
    if (!isAxiosError(error)) {
        return null;
    }

    return error.response?.status ?? null;
}

export function isUnauthorizedError(error: unknown): boolean {
    return getApiErrorStatus(error) === 401;
}

export function isForbiddenError(error: unknown): boolean {
    return getApiErrorStatus(error) === 403;
}

export function isNotFoundError(error: unknown): boolean {
    return getApiErrorStatus(error) === 404;
}
