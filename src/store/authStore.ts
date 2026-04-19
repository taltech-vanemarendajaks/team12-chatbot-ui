import { create } from 'zustand';
import { type AuthUser, fetchCurrentUser, getLoginPage, logoutUser } from '../features/auth/api/authApi';

type AuthState = {
    authUser: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    checkAuthenticated: () => Promise<void>;
    setAuthUser: (user: AuthUser | null) => void;
    login: () => Promise<void>;
    logout: () => Promise<void>;
};


export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isAuthenticated: false,
    isLoading: true,

    checkAuthenticated: async (): Promise<void> => {
        set({ isLoading: true });
        try {
            const user = await fetchCurrentUser();
            set({ authUser: user, isAuthenticated: user !== null });
        } catch (error) {
            console.error('CheckAuthenticated error:', error);
            set({ authUser: null, isAuthenticated: false });
        } finally {
            set({ isLoading: false });
        }
    },

    setAuthUser: (user: AuthUser | null) => set({ authUser: user, isAuthenticated: user !== null }),

    login: async () => {
        set({ isLoading: true });
        try {
            window.location.href = getLoginPage();
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await logoutUser();
            set({
                authUser: null,
                isAuthenticated: false,
            });
            window.location.href = getLoginPage();
        } finally {
            set({ isLoading: false });
        }
    },
}));
