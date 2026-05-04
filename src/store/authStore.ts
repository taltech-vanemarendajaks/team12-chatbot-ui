import { create } from 'zustand';
import {
    type AuthUser,
    fetchCurrentUser,
    getLoginPage,
    logoutUser,
    // registerUser,
} from '../features/auth/api/authApi';

type AuthState = {
    authUser: AuthUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    checkAuthenticated: () => Promise<void>;
    setAuthUser: (user: AuthUser | null) => void;
    login: () => Promise<void>;
    // register: () => Promise<void>;
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

            const shouldRedirectAfterLogin = localStorage.getItem('redirectAfterLogin') === 'true';

            if (user?.roleName === 'ADMIN' && shouldRedirectAfterLogin) {
                localStorage.removeItem('redirectAfterLogin');

                if (window.location.pathname !== '/admin/chatbot') {
                    window.location.replace('/admin/chatbot');
                }
            }
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
            localStorage.setItem('redirectAfterLogin', 'true');
            window.location.href = getLoginPage();
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await logoutUser();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            set({
                authUser: null,
                isAuthenticated: false,
                isLoading: false
            });

            window.location.href = '/login';
        }
    },
}));
