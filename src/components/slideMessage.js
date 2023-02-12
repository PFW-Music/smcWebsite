import React from "react";
import { animated, useSpring } from "react-spring";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const noteStyle = {
  background: "#0A0A0A",
  color: "#F5F5F5",
  padding: "1.5rem"
};

function SlideMessage() {
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
    <Grid item xs={12}>
      <animated.div style={slideStyle}>
        <div style={noteStyle}>
          <h1>Schedule SMC Events</h1>
          <Box
            sx={{
              textAlign: "left",
              m: "auto",
              fontSize: 16,
              fontStyle: "italic",
              fontWeight: "Light",
              lineHeight: 1.3,
              width: "80%"
            }}
          >
            Everyone can take advantage of scheduling time in the edit & collaboration spaces in the SMC building.
            Approved students registered for certain
            classes have privileges to schedule time in the recording studio, rehearsal room and control room.
          </Box>
        </div>
      </animated.div>
    </Grid>
  );
}

export default SlideMessage;
