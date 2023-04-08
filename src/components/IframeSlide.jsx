import React from "react";

const noteStyle = {
  background: "#16181A",
  color: "white",
  padding: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function IframeSlideComponent({ src }) {
  return (
    <div style={noteStyle}>
      <iframe
        className="airtable-embed"
        src={src}
        sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
        loading="lazy"
        width="1000"
        height="600"
      />
    </div>
  );
}

const IframeSlide = React.memo(IframeSlideComponent);

export default IframeSlide;
