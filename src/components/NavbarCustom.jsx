import React from "react";
import LogoPFW from "../assets/LogoPFW.webp";
import { Navbar } from "@nextui-org/react";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#181A1B",
  padding: "15px",
  width: "100%"
};

const containerStyle2 = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#181A1B",
  padding: "15px",
  flexDirection: "column"
};

const linkStyle = {
  marginRight: "100px"
};

const NavbarCustom = () => {
  return (<div style={containerStyle}>
    <div style={containerStyle2}>
      <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
        <img src={LogoPFW} alt="logo" height={45} />
      </a>
      <Navbar isCompact isBordered variant="sticky">
        <Navbar.Content enableCursorHighlight hideIn="L" variant="underline">
          <Navbar.Link href="/" style={linkStyle}>

            Book Rooms
          </Navbar.Link>
          <Navbar.Link href="/schedules" style={linkStyle}>

            Room Schedules
          </Navbar.Link>
          <Navbar.Link href="/gear" style={linkStyle}>Gear Checkout</Navbar.Link>
          <Navbar.Link href="/contact"> Contact Us </Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </div>
  </div>);
};

export default NavbarCustom;