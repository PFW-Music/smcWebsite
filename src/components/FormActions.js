import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import Paper from "@mui/material/Paper";

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

	const buttonClasses =
		"border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-4 py-2 mr-6 mb-6";

	return (
		<Paper sx={{ maxWidth: 700, width: "90%", my: 2, mx: "auto", p: 2 }}>
		<div
			className={`flex ${
				isSmallScreen ? "flex-col" : "flex-row"
			} p-4 justify-center items-center`}
		>
			
		<div>
			<Box sx={{ textAlign: "left", m: 2 }}>
				<Button bordered color="warning" auto onClick={handleNewEvent}>
					Create Event
				</Button>
			</Box>
			</div>
			<Box sx={{ textAlign: "left", m: 2 }}>
			<Button bordered color="warning" auto onClick={handleUpdateEvent}>
				Update Event
			</Button>
			</Box>
			<Box sx={{ textAlign: "left", m: 2 }}>
			<Button bordered color="warning" auto onClick={handleCancelEvent}>
				Cancel Event
			</Button>
			</Box>
		</div>
		</Paper>
	);
}

export default FormActions;
