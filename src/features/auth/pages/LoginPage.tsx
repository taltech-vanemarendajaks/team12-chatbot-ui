import { AppBar, Box, Paper, Stack } from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import theme from '@/app/theme';
import { useAuthStore } from '../../../../src/store/authStore';
import type { AuthProvider } from '@toolpad/core';
import Spinner from '@/shared/ui/Spinner.tsx';
import { Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import bossbotWhite from '@/assets/images/bossbot_white.png';
import bossbotTransparent from '@/assets/images/bossbot_transparent.png';

const providers = [
    { id: 'google', name: 'Google' },
];

export const LoginPage = () => {
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const isDark = useMemo(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    }, []);

    const signIn = (_provider: AuthProvider) => {
        void login();
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Set button and logo colors based on theme
    const logoSrc = isDark ? bossbotTransparent : bossbotWhite;
    const buttonStyles = {
        width: '100%',
        padding: 12,
        fontSize: 18,
        borderRadius: 8,
        background: isDark ? 'var(--accent)' : '#222B45',
        color: '#fff', // always white for contrast
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        letterSpacing: 1,
        transition: 'background 0.2s',
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            sx={{ background: 'var(--bg)', color: 'var(--text)' }}
        >
            <AppBar position="static" />
            <Box flex={1} display="flex" alignItems="center" justifyContent="center">
                <Paper
                    elevation={8}
                    sx={{
                        width: { xs: 320, sm: 400, md: 480 },
                        p: { xs: 2, sm: 3 },
                        borderRadius: 3,
                        background: isDark ? 'rgba(36, 40, 47, 0.98)' : '#fff',
                        color: 'var(--text)',
                        boxShadow: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Box
                            component="img"
                            src={logoSrc}
                            alt="BossBot Logo"
                            sx={{ height: { xs: 80, md: 120 }, width: { xs: 80, md: 120 } }}
                        />
                    </Box>
                    <AppProvider theme={theme}>
                        <Stack spacing={2} width="100%" alignItems="center">
                            <Box width="100%">
                                <button onClick={() => signIn(providers[0])} style={buttonStyles}>
                                    Sign in with Google
                                </button>
                            </Box>
                        </Stack>
                    </AppProvider>
                </Paper>
            </Box>
        </Box>
    );
};
