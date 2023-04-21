import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function EventDetailsInput({
	setSessionTitle,
	setEventTypeSelected,
	setUsageSelected,
}) {
	const eventTypes = [
		"Summer Booking 🏖",
		"Recording Session 🎙",
		"Student Project 🎬",
		"Class 📚",
		"Meeting 🤝",
		"Rehearsal 💪",
		"Audition 👨‍⚖️",
	];

	const eventUsages = ["Personal Use 👤", "Academic 🎓", "Sweetwater 🤝"];

	const [selectedEventType, setSelectedEventType] = React.useState("");
	const [selectedEventUsage, setSelectedEventUsage] = React.useState("");

	const handleEventTypeSelect = (event) => {
		setSelectedEventType(event.target.value);
		setEventTypeSelected(event.target.value);
	};

	const handleEventUsageSelect = (event) => {
		setSelectedEventUsage(event.target.value);
		setUsageSelected(event.target.value);
	};

	return (
		<div>
			<Stack>
				<TextField
					variant="standard"
					id="outlined-name"
					label="Session Title"
					onChange={(event) => {
						setSessionTitle(event.target.value);
					}}
					fullWidth
				/>

				<FormControl fullWidth variant="standard">
					<InputLabel id="event-type-label">Event Type</InputLabel>
					<Select
						labelId="event-type-label"
						value={selectedEventType}
						onChange={handleEventTypeSelect}
						fullWidth
					>
						{eventTypes.map((type) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth variant="standard">
					<InputLabel id="event-usage-label">Intended Use</InputLabel>
					<Select
						labelId="event-usage-label"
						value={selectedEventUsage}
						onChange={handleEventUsageSelect}
						fullWidth
					>
						{eventUsages.map((usage) => (
							<MenuItem key={usage} value={usage}>
								{usage}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Stack>
		</div>
	);
}
