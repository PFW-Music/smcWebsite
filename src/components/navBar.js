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

const styles = makeStyles({
  nav: {
    backgroundColor: "white",
    width: "100%",
    boxShadow: "0 2px 4px 0 rgba(0,0,0,.2);"
  },
  logo: {
    backgroundColor: "white",
    display: "block",
    margin: "0 auto",
    maxWidth: "250px",
    padding: "1em",
    width: "100%",
    "&:hover": {
      color: "black"
    }
  },

  navLinks: {
    display: "flex",
    top: "0",
    justifyContent: "center",
    position: "sticky",
    zIndex: "10",
    backgroundColor: "rgba(207,185,145)",
    "@media (max-width: 600px)": {
      display: "none"
    }
  },

  list: {
    width: "100%",
    listStyle: "none",
    display: "flex",
    justifyContent: "space-evenly",
    padding: 0,
    fontWeight: "bold"
  },

  links: {
    fontSize: "1em",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  mobileMenu: {
    display: "flex",
    top: "0",
    position: "sticky"
  }
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

          <Drawer anchor="left" variant="temporary" open={open} onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}>
            {/* The inside of the drawer */}
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: "rgba(207,185,145)"
              }}
            >
              {/* 
                  when clicking the icon it calls the function toggleDrawer 
                  and closes the drawer by setting the variable open to false
                  */}
              <IconButton sx={{ mb: 1 }}>
                <CloseIcon sx={{ fontSize: "1.5em", mt: 1, mr: 1 }} onClick={toggleDrawer(false)} />
              </IconButton>

              <Box sx={{ mb: 2 }}>
                <ListItemButton component={NavLink} to="/">
                  <ListItemText className={classes.links} primary="Book Rooms" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/schedules">
                  <ListItemText className={classes.links} primary="Room Schedules" />
                </ListItemButton>

                <ListItemButton component={NavLink} to="/gear">
                  <ListItemText className={classes.links} primary="Gear Checkout" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/contact">
                  <ListItemText className={classes.links} primary="Contact Us" />
                </ListItemButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translate(-50%, 0)"
                }}
              ></Box>
            </Box>
          </Drawer>

          <a class={classes.logo}
             href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479.52 99.94">
              <path
                fill="rgba(207,185,145)"
                d="M440.83 99.94h36.37v-9.38h-24.14V76.83h21.84v-9.38h-21.84V54.51h23.98v-9.37h-36.21v54.8zM385.32 99.94h10.88V63.17l19.06 36.77h13.02v-54.8H417.4v36.45l-19.21-36.45h-12.87v54.8zM347.99 99.94h12.15V83.18l17.24-38.04h-11.91l-10.89 26.05-10.48-26.05h-13.26l17.15 38.04v16.76zM309.08 52l6.59 26.36h-13.26zm-23.74 48H297l3.1-12.31H318l3.09 12.31h12.55l-15.17-54.8H300.5zM225.7 99.94h15.64l8.82-43.92 8.73 43.92h15.25l10.17-54.8h-10.33l-6.83 43.6-8.66-43.6h-15.8l-8.66 43.6-6.82-43.6h-11.6l10.09 54.8zM163.43 99.94h12.23V54.99h14.93v-9.85H148.5v9.85h14.93v44.95zM109.83 69.84V53.72H126l2.7 2.7V67l-2.86 2.86zM97.6 99.94h12.23V78.49h12.55l6.91 21.45h12.62l-7.86-23.19 6.83-6.83V52.76l-7.7-7.62H97.6zM59 90.8l-3.18-3.17V57.45L59 54.27h13l3.18 3.18v30.18L72 90.8zm-7.3 9.14h27.56l8.1-8.11V53.24l-8.1-8.1H51.7l-8.1 8.1v38.59zM0 99.94h12.23V78.02h21.04v-9.3H12.23V54.51h23.11v-9.37H0v54.8z"
              ></path>
              <path
                fill="currentColor"
                d="M9.71 3.85v12.47l6.46-.47c1.6-.74 3.25-1.71 3.25-5.74 0-3-.14-6.26-6-6.26zM3.56 4L.09 3V.45h13.55c8.83 0 12.09 2.82 12.09 9.49 0 6.23-3.56 9.47-10.54 9.47H9.71v10l3.51 1v2.32H0v-2.32l3.56-1zM71.72 3.87v12.3l6.53-.44c2.08-1 3.08-2.67 3.08-6.06 0-3.55-1.15-5.8-4.84-5.8zM76.1 19h-4.38v10.4l3.51 1v2.32H62v-2.31l3.56-1V4l-3.51-1V.45h14.16c8.39 0 11.44 3 11.44 8.7 0 4.42-1.72 6.72-5.71 8.3l6 11.68 3.86 1.28v2.32h-9zM355.69 3.87v12.3l6.54-.44c2.07-1 3.07-2.67 3.07-6.06 0-3.55-1.15-5.8-4.84-5.8zM360.07 19h-4.38v10.4l3.51 1v2.32H346v-2.31l3.56-1V4L346 3V.45h14.15c8.39 0 11.45 3 11.45 8.7 0 4.42-1.73 6.72-5.71 8.3l6 11.68 3.86 1.28v2.32h-9zM104.12 3.88V29.4h4.62c3.17 0 8.64-.52 8.64-12.17 0-9.18-1.64-13.35-8.64-13.35zm-9.71 26.53l3.51-1V4l-3.47-1V.45h15.61c8.83 0 14 5.32 14 15.79 0 11.84-5.34 16.49-14.65 16.49h-15zM182.18 23.38l-2.28 6.02h-10.11V17.78h5.73l.73 3.25h2.55v-9.78h-2.55l-.73 3.14h-5.73V3.88h9.67l1.85 6.23h3.48l-.22-9.66h-24.44v2.5l3.47 1.01v25.48l-3.52.97v2.32h24.97l.57-9.35h-3.44zM339.41 23.38l-2.28 6.02h-10.11V17.78h5.73l.74 3.25h2.54v-9.78h-2.54l-.74 3.14h-5.73V3.88h9.67l1.85 6.23h3.48L341.8.45h-24.44v2.5l3.47 1.01v25.48l-3.52.97v2.32h24.97l.57-9.35h-3.44zM55.77 21.63c0 8.19-3.91 11.59-11.93 11.59-7.38 0-12.71-2.95-12.71-10.73V4l-3.52-1V.45h13.18V3l-3.51 1v18.49c0 4.65 2.15 6.7 7.29 6.7 3.55 0 6.81-2.08 6.81-7.13V4l-3.47-1V.45h11.37V3l-3.51 1zM153.84 21.63c0 8.19-3.91 11.59-11.92 11.59-7.38 0-12.72-2.95-12.72-10.73V4l-3.51-1V.45h13.17V3l-3.51 1v18.49c0 4.65 2.15 6.7 7.29 6.7 3.55 0 6.81-2.08 6.81-7.13V4L146 3V.45h11.38V3l-3.52 1zM226.3 21.63c0 8.19-3.91 11.59-11.93 11.59-7.38 0-12.71-2.95-12.71-10.73V4l-3.52-1V.45h13.18V3l-3.51 1v18.49c0 4.65 2.15 6.7 7.29 6.7 3.55 0 6.81-2.08 6.81-7.13V4l-3.47-1V.45h11.37V3l-3.51 1zM475.87 33a3.66 3.66 0 113.65-3.66 3.65 3.65 0 01-3.65 3.66zm0-6.47a2.82 2.82 0 102.81 2.81 2.82 2.82 0 00-2.81-2.77z"
              ></path>
              <path
                d="M475.41 29.14h.59c.39 0 .55-.15.55-.43s-.18-.43-.54-.43h-.62zm0 .57v1.35h-.71v-3.35h1.47c.73 0 1.13.4 1.13.92a.81.81 0 01-.49.79c.17.06.42.23.42.83v.17a2.52 2.52 0 000 .64h-.69a2.38 2.38 0 01-.07-.76v-.05c0-.36-.09-.54-.63-.54zM240.29 11.05V29.4l3.52 1.01v2.33h-11.22v-2.33l3.56-1.01V5.85l-1.96-2.08-2.22-.87V.4h7.53l17.29 21.96V3.92l-3.48-1.02V.4h11.14v2.5l-3.52 1.02v28.91h-3.21l-17.43-21.78zM270.58 3.92l-3.52-1.06V.4h13.2v2.46l-3.52 1.06v25.61l3.48 1.01v2.2h-13.2v-2.2l3.56-1.01V3.92zM285.41 3.92l-3.52-1.02V.4h13.86v2.5l-3.52 1.02 7.7 22 7.88-22-3.52-1.02V.4h11.4v2.5l-3.57 1.02-10.74 28.82h-5.23L285.41 3.92zM377.68 23.41h4.05l.93 4.49a11.78 11.78 0 006.47 1.94 14.26 14.26 0 001.8-.13 5.46 5.46 0 002.46-4.58c0-8.27-15.62-4.89-15.62-15.67C377.77 4 383 0 389.43 0a18.87 18.87 0 018.19 2v8.06h-4l-1.41-5.59a12.1 12.1 0 00-4.8-1.06 9.37 9.37 0 00-1.49.13 5 5 0 00-2.51 4.32c0 7.08 15.49 4.62 15.53 15.58 0 5.37-4.93 9.72-11.88 9.72a16.76 16.76 0 01-9.33-2.86zM405.03 3.92l-3.52-1.06V.4h13.2v2.46l-3.52 1.06v25.61l3.48 1.01v2.2h-13.21v-2.2l3.57-1.01V3.92zM427.71 3.92h-5.15l-1.41 6.2h-3.7V.4h26.94v9.72h-3.7l-1.36-6.2h-5.46V29.4l3.52 1.01v2.33h-13.25v-2.33l3.57-1.01V3.92zM458.94 20.02l-8.85-16.1-3.52-1.02V.4h13.86v2.5l-3.52 1.02 6.25 12.14 6.38-12.14-3.52-1.02V.4h11.45v2.5l-3.53 1.02-8.88 16.1v9.38l3.52 1.01v2.33h-13.21v-2.33l3.57-1.01v-9.38z"></path>
            </svg>
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
