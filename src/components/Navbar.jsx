import React from "react";
import { NavLink } from "react-router-dom";


import LogoPFW from "../assets/LogoPFW.webp";

const navbarLogoStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "#181A1B",
  boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  padding: "15px",
};

const navbarLinksStyle = {
  backgroundColor: "#181A1B",
  fontFamily: "'Manrope', sans-serif",
  display: "flex",
};

const navbarLinksContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "#181A1B",
  overflow: "hidden",
  padding: "10px",
};

const linkStyle = {
  display: "flex",
  color: "#fff",
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "25px",
  textTransform: "capitalize",
  margin: "0 1rem",
  textDecoration: "none",
  cursor: "pointer",
};

const activeLinkStyle = {
  ...linkStyle,
  textDecoration: "underline",
};

const Navbarlogo = () => {
  return (
    <div style={navbarLogoStyle}>
      <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
        <img src={LogoPFW} alt="logo" height={45} />
      </a>
    </div>
  );
};


const Navbarlinks = () => {
  return (
    <>
      <div style={navbarLinksStyle}>
        <div style={navbarLinksContainerStyle}>
          <p>
            <NavLink to="/" style={linkStyle} activeStyle={activeLinkStyle}>
              Book Rooms
            </NavLink>
          </p>
          <p>
            <NavLink
              to="/schedules"
              style={linkStyle}
              activeStyle={activeLinkStyle}
            >
              Room Schedules
            </NavLink>
          </p>
          <p>
            <NavLink to="/gear" style={linkStyle} activeStyle={activeLinkStyle}>
              Gear Checkout
            </NavLink>
          </p>
          <p>
            <NavLink
              to="/contact"
              style={linkStyle}
              activeStyle={activeLinkStyle}
            >
              Contact Us
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <div>
      <Navbarlogo />
      <Navbarlinks />
    </div>
  );
};

export default Navbar;
