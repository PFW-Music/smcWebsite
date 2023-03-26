import React from "react";
import { animated, useSpring } from "react-spring";
import { Text } from "@nextui-org/react";

const noteStyle = {
  background: "#0A0A0A",
  color: "#F5F5F5",
  padding: "1.5rem",
};

function SlideMessage({ title, subtitle }) {
  const slideStyle = useSpring({
    from: {
      opacity: 0,
      marginLeft: -500,
    },
    to: {
      opacity: 1,
      marginLeft: 0,
    },
  });

  return (
    <animated.div style={slideStyle}>
      <div style={noteStyle}>
        <Text size={40} color="textLight">{title}</Text>
        <Text size={25} color="textLight">{subtitle}</Text>
      </div>
    </animated.div>
  );
}

export default SlideMessage;