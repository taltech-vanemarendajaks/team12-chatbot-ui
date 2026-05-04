import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                p: 3,
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" component="h1">
                Access denied
            </Typography>
            <Typography color="text.secondary">
                You are logged in, but you do not have permission to open this page.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
                Back to chat
            </Button>
        </Box>
    );
}
