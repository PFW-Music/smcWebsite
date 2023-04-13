import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";

function FormActions({
	setNewEvent,
	setUpdateEvent,
	setCancelEvent,
	setEventID,
	setIDError,
	setGoodID,
	setUserSelected,
}) {
	const handleNewEvent = () => {
		setNewEvent(true);
		setUpdateEvent(false);
		setCancelEvent(false);

		// initialize ID status
		setEventID("");
		setIDError(false);
		setGoodID(false);

		// initialize form values
		setUserSelected([]);
	};

	const handleUpdateEvent = () => {
		setNewEvent(false);
		setUpdateEvent(true);
		setCancelEvent(false);

		// initialize ID status
		setEventID("");
		setIDError(false);
		setGoodID(false);
	};

	const handleCancelEvent = () => {
		setNewEvent(false);
		setUpdateEvent(false);
		setCancelEvent(true);

		// initialize ID status
		setEventID("");
		setIDError(false);
		setGoodID(false);
	};

	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const checkIsSmallScreen = () => {
			setIsSmallScreen(window.matchMedia("(max-width: 600px)").matches);
		};

		checkIsSmallScreen();
		window.addEventListener("resize", checkIsSmallScreen);

		return () => {
			window.removeEventListener("resize", checkIsSmallScreen);
		};
	}, []);

	return (
		<div
			className={`bg-neutral-900 flex ${
				isSmallScreen ? "flex-col space-y-4" : "flex-row space-x-4"
			} justify-center items-center`}
		>
			<div>
				<Button bordered color="warning" auto onClick={handleNewEvent}>
					Create Event
				</Button>
			</div>
			<Button bordered color="warning" auto onClick={handleUpdateEvent}>
				Update Event
			</Button>
			<Button bordered color="warning" auto onClick={handleCancelEvent}>
				Cancel Event
			</Button>
		</div>
	);
}

export default FormActions;
