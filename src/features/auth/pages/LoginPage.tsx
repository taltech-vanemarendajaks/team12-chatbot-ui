import { AppBar, Box, Paper, Stack } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import theme from '@/app/theme';
import { useAuthStore } from '../../../../src/store/authStore';
import type { AuthProvider } from '@toolpad/core';
import Spinner from '@/shared/ui/Spinner.tsx';
import { Navigate } from 'react-router-dom';
import bossbotWhite from '@/assets/images/bossbot_white.png';
import bossbotTransparent from '@/assets/images/bossbot_transparent.png';

const providers = [
    { id: 'google', name: 'Google' },
];

export const LoginPage = () => {
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const signIn = (_provider: AuthProvider) => {
        void login();
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" sx={{ background: 'var(--bg)', color: 'var(--text)' }}>
            <AppBar position="static" />
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
                <Paper elevation={8} sx={{ width: { xs: 320, sm: 400, md: 480 }, p: { xs: 2, sm: 3 }, borderRadius: 3, background: 'var(--login-box-bg)', color: 'var(--text)', boxShadow: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Box component="img"
                            src={window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? bossbotTransparent : bossbotWhite}
                            alt="BossBot Logo"
                            sx={{ height: { xs: 80, md: 120 }, width: { xs: 80, md: 120 } }}
                        />
                    </Box>
                    <AppProvider theme={theme}>
                        <Stack spacing={2} width="100%" alignItems="center">
                            <Box width="100%">
                                <button onClick={() => signIn(providers[0])} style={{ width: '100%', padding: 12, fontSize: 18, borderRadius: 8, background: 'var(--accent)', color: 'var(--text-h)', border: 'none', cursor: 'pointer' }}>Sign in with Google</button>
                            </Box>
                        </Stack>
                    </AppProvider>
                </Paper>
            </Box>
        </Box>
    );
};
