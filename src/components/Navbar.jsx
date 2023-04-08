"use client";
import Link from "next/link";
import Image from "next/image";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#16181A",
  width: "100%",
  flexDirection: "column",
  padding: "15px",
};

const listStyle = {
  listStyleType: "none",
  margin: 0,
  padding: "10px",
  display: "flex",
};

const listItemStyle = {
  marginRight: "10px",
};

const NavbarCustom = () => {
  return (
    <div style={containerStyle}>
      <Image src={"/LogoPFW.webp"} width={300} height={50} alt={"Logo"}></Image>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <Link href="/">Home</Link>
        </li>
        <li style={listItemStyle}>
          <Link href="/schedule">Schedules</Link>
        </li>
        <li style={listItemStyle}>
          <Link href="/gear">Gear</Link>
        </li>
        <li style={listItemStyle}>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavbarCustom;