import React from "react";
import { Text } from "@nextui-org/react";

function SlideMessage({ title, subtitle }) {
	return (
		<div className="bg-neutral-900 flex items-center justify-center w-full">
			<div className="bg-neutral-900 flex flex-col items-center justify-center max-w-2xl">
				<Text className="text-2xl">{title}</Text>
				<Text className="text-xl">{subtitle}</Text>
			</div>
		</div>
	);
}

export default SlideMessage;
