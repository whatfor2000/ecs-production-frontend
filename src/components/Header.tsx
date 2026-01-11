import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!auth) return null; // Prevent context null
  const { user, setUser } = auth;

  // const isLogin = !!user;
  const isLogin = false;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, { 
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`,
          },
        withCredentials: true });
      Cookies.remove("access_token");
      localStorage.removeItem("access_token");
      
      setUser(null);
      navigate("/login");

    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "rgba(5, 7, 13, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          px: { xs: 2, md: 4 },
          py: { xs: 1, md: 1.5 },
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo + Title */}
        <NavLink 
          to="/" 
          style={{ 
            textDecoration: "none", 
            display: "flex", 
            alignItems: "center", 
            gap: 1.5,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
        >
          <img 
            src="./images/Logo.png" 
            alt="Logo" 
            style={{ 
              width: 42, 
              height: 42,
              borderRadius: "8px",
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              color: "#fff", 
              fontWeight: 400, 
              fontFamily: "Bebas Neue, sans-serif", 
              fontSize: { xs: "1.5rem", md: "1.75rem" },
              letterSpacing: "2px",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Echoshape
          </Typography>
        </NavLink>

        {/* Navigation */}
        <Box 
          sx={{ 
            display: { xs: "none", md: "flex" }, 
            gap: 1,
            alignItems: "center",
          }}
        >
          <NavLink 
            to="/" 
            style={({ isActive }) => ({ 
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            })}
          >
            {({ isActive }) => (
              <Typography 
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.95rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  transition: "color 0.2s ease",
                  position: "relative",
                  "&::after": isActive ? {
                    content: '""',
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "2px",
                    borderRadius: "2px",
                    backgroundColor: "#2b6bff",
                    boxShadow: "0 0 8px rgba(43,107,255,0.6)",
                  } : {},
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                Home
              </Typography>
            )}
          </NavLink>
          <NavLink 
            to={isLogin ? "/HomeAfterLogin" : "/login"} 
            style={({ isActive }) => ({ 
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            })}
          >
            {({ isActive }) => (
              <Typography 
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.95rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  transition: "color 0.2s ease",
                  position: "relative",
                  "&::after": isActive ? {
                    content: '""',
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "2px",
                    borderRadius: "2px",
                    backgroundColor: "#2b6bff",
                    boxShadow: "0 0 8px rgba(43,107,255,0.6)",
                  } : {},
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                Explore
              </Typography>
            )}
          </NavLink>
          <NavLink 
            to={isLogin ? "/function" : "/login"} 
            style={({ isActive }) => ({ 
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            })}
          >
            {({ isActive }) => (
              <Typography 
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.95rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  transition: "color 0.2s ease",
                  position: "relative",
                  "&::after": isActive ? {
                    content: '""',
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "2px",
                    borderRadius: "2px",
                    backgroundColor: "#2b6bff",
                    boxShadow: "0 0 8px rgba(43,107,255,0.6)",
                  } : {},
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                Create Picture
              </Typography>
            )}
          </NavLink>
          <NavLink 
            to="/subscription" 
            style={({ isActive }) => ({ 
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            })}
          >
            {({ isActive }) => (
              <Typography 
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.95rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  transition: "color 0.2s ease",
                  position: "relative",
                  "&::after": isActive ? {
                    content: '""',
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "2px",
                    borderRadius: "2px",
                    backgroundColor: "#2b6bff",
                    boxShadow: "0 0 8px rgba(43,107,255,0.6)",
                  } : {},
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                Subscribe 
              </Typography>
            )}
          </NavLink>
          <NavLink 
            to="/about" 
            style={({ isActive }) => ({ 
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.2s ease",
            })}
          >
            {({ isActive }) => (
              <Typography 
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "0.95rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  transition: "color 0.2s ease",
                  position: "relative",
                  "&::after": isActive ? {
                    content: '""',
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "24px",
                    height: "2px",
                    borderRadius: "2px",
                    backgroundColor: "#2b6bff",
                    boxShadow: "0 0 8px rgba(43,107,255,0.6)",
                  } : {},
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                About
              </Typography>
            )}
          </NavLink>
        </Box>

        {/* Login / Logout / Profile */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5, alignItems: "center" }}>
          {isLogin ? (
            <>
              <Button 
                variant="contained" 
                onClick={() => navigate("/profile")}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.5,
                  py: 1,
                  border: "1px solid rgba(255,255,255,0.15)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                }}
              >
                Profile
              </Button>
              <Button 
                variant="contained" 
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#d32f2f",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  px: 2.5,
                  py: 1,
                  border: "1px solid rgba(211,47,47,0.3)",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(211,47,47,0.3)",
                  "&:hover": {
                    backgroundColor: "#c62828",
                    borderColor: "rgba(211,47,47,0.5)",
                    boxShadow: "0 6px 16px rgba(211,47,47,0.4)",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button 
              variant="contained" 
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: "#2b6bff",
                color: "#fff",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                py: 1,
                boxShadow: "0 4px 12px rgba(43,107,255,0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#3976ff",
                  boxShadow: "0 6px 16px rgba(43,107,255,0.4)",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>

        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "rgba(5, 7, 13, 0.95)",
            backdropFilter: "blur(20px)",
            color: "#fff",
            pt: 2,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, mb: 2 }}>
          <Typography sx={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "1.5rem", letterSpacing: "2px" }}>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          <ListItem sx={{ px: 0, py: 1 }}>
            <NavLink to="/" style={{ textDecoration: "none", width: "100%" }} onClick={handleDrawerToggle}>
              <Typography sx={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: "1rem", py: 1 }}>
                Home
              </Typography>
            </NavLink>
          </ListItem>
          <ListItem sx={{ px: 0, py: 1 }}>
            <NavLink 
              to={isLogin ? "/HomeAfterLogin" : "/login"} 
              style={{ textDecoration: "none", width: "100%" }} 
              onClick={handleDrawerToggle}
            >
              <Typography sx={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: "1rem", py: 1 }}>
                Explore
              </Typography>
            </NavLink>
          </ListItem>
          <ListItem sx={{ px: 0, py: 1 }}>
            <NavLink 
              to={isLogin ? "/function" : "/login"} 
              style={{ textDecoration: "none", width: "100%" }} 
              onClick={handleDrawerToggle}
            >
              <Typography sx={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: "1rem", py: 1 }}>
                Create Picture
              </Typography>
            </NavLink>
          </ListItem>
          <ListItem sx={{ px: 0, py: 1 }}>
            <NavLink to="/about" style={{ textDecoration: "none", width: "100%" }} onClick={handleDrawerToggle}>
              <Typography sx={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: "1rem", py: 1 }}>
                About
              </Typography>
            </NavLink>
          </ListItem>
          <ListItem sx={{ px: 0, py: 1 }}>
            <NavLink to="/subscription" style={{ textDecoration: "none", width: "100%" }} onClick={handleDrawerToggle}>
              <Typography sx={{ color: "#fff", fontFamily: "Poppins, sans-serif", fontSize: "1rem", py: 1 }}>
                Subscribe
              </Typography>
            </NavLink>
          </ListItem>
          {isLogin && (
            <>
              <ListItem sx={{ px: 0, py: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    navigate("/profile");
                    handleDrawerToggle();
                  }}
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    py: 1.5,
                    mt: 1,
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  Profile
                </Button>
              </ListItem>
              <ListItem sx={{ px: 0, py: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    handleLogout();
                    handleDrawerToggle();
                  }}
                  sx={{
                    backgroundColor: "#d32f2f",
                    color: "#fff",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    textTransform: "none",
                    borderRadius: "8px",
                    py: 1.5,
                    border: "1px solid rgba(211,47,47,0.3)",
                    boxShadow: "0 4px 12px rgba(211,47,47,0.3)",
                    "&:hover": {
                      backgroundColor: "#c62828",
                      borderColor: "rgba(211,47,47,0.5)",
                      boxShadow: "0 6px 16px rgba(211,47,47,0.4)",
                    },
                  }}
                >
                  Logout
                </Button>
              </ListItem>
            </>
          )}
          {!isLogin && (
            <ListItem sx={{ px: 0, py: 1 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  navigate("/login");
                  handleDrawerToggle();
                }}
                sx={{
                  backgroundColor: "#2b6bff",
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  py: 1.5,
                  mt: 1,
                  boxShadow: "0 4px 12px rgba(43,107,255,0.3)",
                }}
              >
                Login
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
