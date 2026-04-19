import Providers from "./Providers";
import Router from "./Router";
import { useAuthStore } from '@/store/authStore.ts';
import { useEffect } from 'react';

export default function App() {
    const checkAuthenticated = useAuthStore((state) => state.checkAuthenticated);

    useEffect(() => {
        void checkAuthenticated()
    }, [checkAuthenticated]);

    return (
        <Providers>
            <Router />
        </Providers>
    );
}
