import React from "react";
import "./navbarlogo.css";
import LogoPFW from "../../assets/LogoPFW.webp";

const Navbarlogo = () => {
  return (
    <div className="navbarlogo">
      <a href="https://pfw-smc.notion.site/pfw-smc/PFW-Sweetwater-Music-Center-17d134f1dd704a56909044ddb24d61ed">
        <img src={LogoPFW} alt="logo" height={45} />
      </a>
    </div>
  );
};

export default Navbarlogo;
