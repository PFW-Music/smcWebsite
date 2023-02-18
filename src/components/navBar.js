import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import LogoPFW from "../assets/LogoPFW.webp";

const styles = makeStyles({
  nav: {
    backgroundColor: "white",
    width: "100%",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2);",
  },
  logo: {
    backgroundColor: "white",
    display: "block",
    margin: "0 auto",
    maxWidth: "250px",
    padding: "1em",
    width: "100%",
    "&:hover": {
      color: "black",
    },
  },

  navLinks: {
    display: "flex",
    top: "0",
    justifyContent: "center",
    position: "sticky",
    zIndex: "10",
    backgroundColor: "rgba(24,26,27)",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },

  list: {
    width: "100%",
    listStyle: "none",
    display: "flex",
    justifyContent: "space-evenly",
    padding: 0,
    fontWeight: "bold",
  },

  links: {
    fontSize: "1em",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  mobileMenu: {
    display: "flex",
    top: "0",
    position: "sticky",
  },
});

function NavBar() {
  const classes = styles();
  const [open, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  return (
    <>
      <div className={classes.nav}>
        <div className={classes.mobileMenu}>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            size="large"
            color="default"
            aria-label="open drawer"
            sx={{ position: "absolute", display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon sx={{ fontSize: "1.5em", mt: 1, mr: 1 }} />
          </IconButton>

          <Drawer
            anchor="left"
            variant="temporary"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: "rgba(24,26,27)",
              }}
            >
              {/* 
                  when clicking the icon it calls the function toggleDrawer 
                  and closes the drawer by setting the variable open to false
                  */}
              <IconButton sx={{ mb: 1 }}>
                <CloseIcon
                  sx={{ fontSize: "1.5em", mt: 1, mr: 1 }}
                  onClick={toggleDrawer(false)}
                />
              </IconButton>

              <Box sx={{ mb: 2 }}>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText
                    className={classes.links}
                    primary="Book Rooms"
                  />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/schedules">
                  <ListItemText
                    className={classes.links}
                    primary="Room Schedules"
                  />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/gear">
                  <ListItemText
                    className={classes.links}
                    primary="Gear Checkout"
                  />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/contact">
                  <ListItemText
                    className={classes.links}
                    primary="Contact Us"
                  />
                </ListItemButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                }}
              ></Box>
            </Box>
          </Drawer>

          <a
            className={classes.logo}
            href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed"
          >
            <img src={LogoPFW} alt="logo" height={45} />
          </a>
        </div>
      </div>
      <div className={classes.navLinks}>
        <ul className={classes.list}>
          <li className={classes.links}>
            <NavLink to="/">Book Rooms</NavLink>
          </li>
          <li className={classes.links}>
            <NavLink to="/schedules">Room Schedules</NavLink>
          </li>
          <li className={classes.links}>
            <NavLink to="/gear">Gear Checkout</NavLink>
          </li>
          <li className={classes.links}>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
