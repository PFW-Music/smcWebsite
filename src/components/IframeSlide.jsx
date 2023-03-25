import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";

const noteStyle = {
  background: "#e7dcc8",
  color: "white",
  padding: "1.5rem",
};

const embedStyle = {
  background: "transparent",
  border: "",
};

function IframeSlideComponent({ src }) {
  const [showIframe, setShowIframe] = useState(false);
  const slideStyle = useSpring({
    from: {
      opacity: 0,
      marginRight: -500,
    },
    to: {
      opacity: 1,
      marginRight: 0,
    },
    onRest: () => setShowIframe(true),
  });

  useEffect(() => {
    return () => {
      setShowIframe(false);
    };
  }, []);

  return (
    <animated.div style={slideStyle}>
      <div style={noteStyle}>
        <br />
        {showIframe && (
          <iframe
            className="airtable-embed"
            src={src}
            sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
            loading="lazy"
            width="50%"
            height="533"
            style={embedStyle}
          />
        )}
      </div>
    </animated.div>
  );
}

const IframeSlide = React.memo(IframeSlideComponent);

export default IframeSlide;