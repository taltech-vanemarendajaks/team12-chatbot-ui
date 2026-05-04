import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLocation } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
    }
    navigate('/login', { replace: true });
  };

  const isRoot = pathname === '/';

  return (
      <Button
          variant="contained"
          color={isRoot ? 'secondary' : 'primary'}
          startIcon={<LogoutIcon />}
          size={isRoot ? 'small' : 'large'}
          onClick={handleLogout}
      >
          Logi välja
      </Button>
  );
}