import type { User } from '../types/user.types.ts';
import { apiClient } from '@/shared/services/apiClient.ts';

const USER_BASE_URL= '/api/v1/users';

export const userApi = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await apiClient.get<User[]>(USER_BASE_URL);
        return response.data;
    }
}
