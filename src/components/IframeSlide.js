import React from "react";

function IframeSlideComponent({ src }) {
	return (
		<div className="bg-neutral-900 text-white flex items-center justify-center p-6">
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
