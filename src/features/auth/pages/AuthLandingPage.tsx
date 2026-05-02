import { Navigate } from 'react-router-dom';
import { ChatPage } from '@/features/chat/pages/ChatPage';
import { useAuthStore } from '@/store/authStore';
export function AuthLandingPage() {
    const authUser = useAuthStore((state) => state.authUser);
    if (authUser?.roleName === 'ADMIN') {
        return <Navigate to="/admin" replace />;
    }
    return <ChatPage />;
}
