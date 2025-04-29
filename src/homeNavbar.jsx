import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useLocation } from "react-router-dom";

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Get in Touch", path: "/contact" },
  {name:"Pricing", path:"/pricing"}
];

const authPages = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

function HomeNavbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const location = useLocation();
  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          {/* <div className="w-[60px] h-[60px]">
            <img
              src="https://res.cloudinary.com/dtrskzurx/image/upload/v1738426457/church-logo_utmuv8.jpg"
              className="rounded-xl"
              alt="Logo"
            />
          </div> */}

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: "auto" }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.concat(authPages).map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography>{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  backgroundColor: location.pathname === page.path ? "green" : "transparent",
                  "&:hover": { backgroundColor: "green" },
                }}
              >
                <Link to={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          {/* Auth Links (Login & Register) - Aligned to Right */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {authPages.map((page) => (
              <Button
                key={page.name}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  backgroundColor: location.pathname === page.path ? "green" : "transparent",
                  "&:hover": { backgroundColor: "green" },
                }}
              >
                <Link to={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HomeNavbar;


