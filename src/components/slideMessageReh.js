import React from "react";
import { animated, useSpring } from "react-spring";

const noteStyle = {
  background: "#0A0A0A",
  color: "#F5F5F5",
  padding: "1.5rem"
};

function SlideMessageReh() {
  const slideStyle = useSpring({
    from: {
      opacity: 0,
      marginLeft: -500
    },
    to: {
      opacity: 1,
      marginLeft: 0
    }
  });

  return (
    <animated.div style={slideStyle}>
      <div style={noteStyle}>
        <h1>Need some practice?</h1>
        <h3>Please check out the calendar below before you book a Rehearsal Space</h3>
      </div>
    </animated.div>
  );
}

export default SlideMessageReh;
