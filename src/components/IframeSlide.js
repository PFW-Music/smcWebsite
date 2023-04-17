import React from "react";

function IframeSlideComponent({ src }) {
	return (
		<div className="bg-neutral-900 text-white flex items-center justify-center p-6">
			<div className="w-full max-w-2xl mx-auto">
				<div className="relative" style={{
					paddingTop: "56.25%",
					minHeight: "300px"
				}}>
					<iframe
						className="airtable-embed absolute top-0 left-0 w-full h-full"
						src={src}
						sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
						loading="lazy"
						style={{
							minWidth: "300px",
							minHeight: "300px",
							maxWidth: "100%",
							maxHeight: "600px",
						}}
					/>
				</div>
			</div>
		</div>
	);
}

const IframeSlide = React.memo(IframeSlideComponent);

export default IframeSlide;
