import React from "react";
import { Text } from "@nextui-org/react";

function SlideMessage({ title, subtitle }) {
	return (
		<div className="bg-neutral-900 text-gray-900 flex items-center justify-center w-full">
			<div className="bg-neutral-900 text-gray-900 flex flex-col items-center justify-center max-w-md">
				<Text size={"35px"}>{title}</Text>
				<Text size={"20px"}>{subtitle}</Text>
			</div>
		</div>
	);
}

export default SlideMessage;
