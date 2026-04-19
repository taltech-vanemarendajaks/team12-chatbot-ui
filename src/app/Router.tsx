import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ChatPage } from "../features/chat/pages/ChatPage";
import AdminLayout from "../features/admin/layout/AdminLayout";
import StampAnswersPage from "../features/admin/pages/StampAnswersPage";
import BannedWordsPage from "../features/banned-words/pages/BannedWordsPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import { fetchLocalDevSecurityStatus } from '../features/auth/api/authApi';
import { useEffect, useState } from 'react';
import Spinner from '@/shared/ui/Spinner.tsx';

/**
 * React component that configures and provides the application's routes.
 * Determines if route protection should be enabled by fetching the local
 * development security status, and conditionally wraps protected routes.
 * Shows a loading spinner while the security status is loading.
 */

function Router() {
    const [ isSecurityEnabled, setIsSecurityEnabled ] = useState<boolean | null>(null);

    useEffect(()=> {
        fetchLocalDevSecurityStatus()
            .then(res => setIsSecurityEnabled(res.isSecurityEnabled))
            .catch(err => {
                    console.error(err);
                    setIsSecurityEnabled(true);

            })

    }, []);
    if(isSecurityEnabled === null) return <Spinner />;


    const router = createBrowserRouter([
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/',
            element: isSecurityEnabled
                ? <ProtectedRoute> <ChatPage /></ProtectedRoute>
                : <ChatPage />,
        },
        {
            path: '/admin',
            element: isSecurityEnabled
                ? <ProtectedRoute> <AdminLayout /></ProtectedRoute>
                : <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/admin/chatbot" replace />,
                },
                {
                    path: 'chatbot',
                    element: <div>BossBot - Tuleb varsti</div>,
                },
                {
                    path: 'stamp-answers',
                    element: <StampAnswersPage />,
                },
                {
                    path: 'banned-words',
                    element: <BannedWordsPage />,
                },
                {
                    path: 'documents',
                    element: <div>Dokumendid - Tuleb varsti</div>,
                },
                {
                    path: 'users',
                    element: <div>Kasutajad - Tuleb varsti</div>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;