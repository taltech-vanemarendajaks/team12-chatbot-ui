import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Block as BlockIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import bossbotLogo from "../../../assets/images/bossbot.svg";

const drawerWidth = 240;

// Mock user role - TODO: Replace with actual auth
// const MOCK_USER_ROLE = 'ADMIN'; // Change to 'USER' to test non-admin view

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  enabled: boolean;
}

const menuItems: MenuItem[] = [
  {
    text: "BossBot",
    icon: <HomeIcon />,
    path: "/admin/chatbot",
    enabled: true,
  },
  {
    text: "Valmisvastused",
    icon: <QuestionAnswerIcon />,
    path: "/admin/stamp-answers",
    enabled: true,
  },
  {
    text: "Keelatud sõnad",
    icon: <BlockIcon />,
    path: "/admin/banned-words",
    enabled: true,
  },
  {
    text: "Dokumendid",
    icon: <DescriptionIcon />,
    path: "/admin/documents",
    enabled: true,
  },
  {
    text: "Kasutajad",
    icon: <PeopleIcon />,
    path: "/admin/users",
    enabled: true,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // TODO: Get from auth context
  // const isAdmin = MOCK_USER_ROLE === 'ADMIN';
  const isLoggedIn = false; // TODO: Get from auth context

  // Remove root element borders for admin layout
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.borderInline = "none";
      root.style.width = "100%";
      root.style.maxWidth = "100%";
    }
    return () => {
      // Restore borders when leaving admin
      if (root) {
        root.style.borderInline = "";
        root.style.width = "";
        root.style.maxWidth = "";
      }
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path: string, enabled: boolean) => {
    if (enabled) {
      navigate(path);
      setDrawerOpen(false); // Close drawer after navigation
    }
  };

  const handleAuthAction = () => {
    // TODO: Implement login/logout logic
    if (isLoggedIn) {
      console.log("Logout clicked");
    } else {
      console.log("Login clicked");
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <img
          src={bossbotLogo}
          alt="BossBot Logo"
          style={{ width: 32, height: 32 }}
        />
        <Typography variant="h6" component="div" sx={{ color: "white" }}>
          BossBot Admin
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path, item.enabled)}
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&.Mui-selected": {
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                  },
                },
                opacity: item.enabled ? 1 : 0.5,
                cursor: item.enabled ? "pointer" : "not-allowed",
              }}
              selected={location.pathname === item.path}
              disabled={!item.enabled}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={handleDrawerToggle}
          >
            <img
              src={bossbotLogo}
              alt="BossBot Logo"
              style={{ width: 32, height: 32 }}
            />
            <Typography variant="h6" noWrap component="div">
              BossBot Admin
            </Typography>
          </Box>
          <Button color="inherit" onClick={handleAuthAction}>
            {isLoggedIn ? "Logi välja" : "Logi sisse"}
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer - toggleable by clicking menu icon or logo/title */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: false,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.paper",
          minHeight: "100vh",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
