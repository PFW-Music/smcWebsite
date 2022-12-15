import React from "react";
import { useSpring, animated } from "react-spring";

const noteStyle = {
  background: "#0A0A0A",
  color: "#F5F5F5",
  padding: "1.5rem",
};

function SlideMessageCollab() {
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
        <h1>Looking for space?</h1>
        <h3>Take advantage of the edit suites and other collaboration spaces in the SMC building.</h3>
      </div>
    </animated.div>
  );
}

export default SlideMessageCollab;
