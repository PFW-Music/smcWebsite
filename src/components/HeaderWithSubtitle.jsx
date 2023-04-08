import React from "react";
import { Text } from "@nextui-org/react";

const noteStyle = {
  background: "#16181A",
  color: "#16181A",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "1000px",
};

const center = {
  background: "#16181A",
  color: "#16181A",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

function SlideMessage({ title, subtitle }) {
  return (
    <div style={center}>
      <div style={noteStyle}>
        <Text size={"35px"}>{title}</Text>
        <Text size={"20px"}>{subtitle}</Text>
      </div>
    </div>
  );
}

export default SlideMessage;
