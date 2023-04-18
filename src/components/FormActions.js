import React, { useState, useEffect } from "react";
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
	// Add a new state variable for the selected button
	const [selectedButton, setSelectedButton] = useState(null);

	const handleNewEvent = () => {
		setNewEvent(true);
		setUpdateEvent(false);
		setCancelEvent(false);

		setEventID("");
		setIDError(false);
		setGoodID(false);

		setUserSelected([]);

		// Update the selected button state
		setSelectedButton("new");
	};

	const handleUpdateEvent = () => {
		setNewEvent(false);
		setUpdateEvent(true);
		setCancelEvent(false);

		setEventID("");
		setIDError(false);
		setGoodID(false);

		// Update the selected button state
		setSelectedButton("update");
	};

	const handleCancelEvent = () => {
		setNewEvent(false);
		setUpdateEvent(false);
		setCancelEvent(true);

		setEventID("");
		setIDError(false);
		setGoodID(false);

		// Update the selected button state
		setSelectedButton("cancel");
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
				<Button
					bordered
					color={selectedButton === "new" ? "primary" : "warning"}
					auto
					onClick={handleNewEvent}
				>
					Create Event
				</Button>
			</div>
			<Button
				bordered
				color={selectedButton === "update" ? "primary" : "warning"}
				auto
				onClick={handleUpdateEvent}
			>
				Update Event
			</Button>
			<Button
				bordered
				color={selectedButton === "cancel" ? "primary" : "warning"}
				auto
				onClick={handleCancelEvent}
			>
				Cancel Event
			</Button>
		</div>
	);
}

export default FormActions;
