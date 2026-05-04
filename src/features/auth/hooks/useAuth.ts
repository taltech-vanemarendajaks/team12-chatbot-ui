import { useAuthStore } from '../../../store/authStore';

export function useAuth() {
    const { authUser, isAuthenticated, isLoading, login, logout } = useAuthStore();

    return {
        user: authUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
}
