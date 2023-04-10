import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import base from "../airtable";

const containerStyle = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: "16px",
};

const modalStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	position: "absolute",
	top: "40%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#16181A",
	outline: 0,
	boxShadow: 20,
	p: 4,
	color: "#191b1d",
};

const textStyle = {
	color: "#fff",
};

async function createRecord(
	users,
	sessionTitle,
	eventTypeSelected,
	faculties,
	usageSelected,
	roomTypeSelected,
	roomSelected,
	startTimeSelected,
	endTimeSelected,
	courses,
	gears,
	locations
) {
	try {
		const records = await base("Events").create([
			{
				fields: {
					"Event Name": sessionTitle,
					"Start Time": startTimeSelected,
					"Proposed End Time": endTimeSelected,
					"🚪 Room(s)": roomSelected,
					Class: courses,
					"Event Type": eventTypeSelected,
					Faculty: faculties,
					Students: users,
					Status: "Booked ✅",
					"Intent of Use": usageSelected,
					"Gear Selection": gears,
					Location: locations,
				},
			},
		]);

		records.forEach(function (record) {
			console.log(record.getId());
		});
	} catch (err) {
		console.error(err);
	}
}

async function updateRecord(
	eventID,
	users,
	sessionTitle,
	eventTypeSelected,
	faculties,
	usageSelected,
	roomTypeSelected,
	roomSelected,
	startTimeSelected,
	endTimeSelected,
	courses,
	gears,
	locations
) {
	try {
		const records = await base("Events").update([
			{
				id: eventID,
				fields: {
					"Event Name": sessionTitle,
					"Start Time": startTimeSelected,
					"Proposed End Time": endTimeSelected,
					"🚪 Room(s)": roomSelected,
					Class: courses,
					"Event Type": eventTypeSelected,
					Students: users,
					Faculty: faculties,
					Status: "Booked ✅",
					"Intent of Use": usageSelected,
					"Gear Selection": gears,
					Location: locations,
				},
			},
		]);

		records.forEach(function () {
			console.log("record updated");
		});
	} catch (err) {
		console.error(err);
	}
}

export default function Submit({
	userSelected,
	setUserSelected,
	sessionTitle,
	setSessionTitle,
	eventTypeSelected,
	setEventTypeSelected,
	facultySelected,
	setFacultySelected,
	usageSelected,
	setUsageSelected,
	roomTypeSelected,
	setRoomTypeSelected,
	roomSelected,
	setRoomSelected,
	startTimeSelected,
	setStartTimeSelected,
	endTimeSelected,
	setEndTimeSelected,
	courseSelected,
	setCourseSelected,
	gearSelected,
	setGearSelected,

	eventID,
	setEventID,
	newEvent,
	setNewEvent,
	updateEvent,
	setUpdateEvent,
	setCancelEvent,
	timeCorrect,
	setUserCount,
	setAddCourse,
	setAddGear,
	roomBookingRecord,
}) {
	const [open, setOpen] = React.useState(false);

	const handleSubmit = async () => {
		setOpen(true);

		const users = userSelected.map((obj) => obj.id);
		const faculties = facultySelected.map((obj) => obj.id);
		const courses = courseSelected.map((obj) => obj.key);
		const gears = gearSelected.map((obj) => obj.id);
		const locations = roomBookingRecord.map((obj) => obj.id);

		if (newEvent) {
			await createRecord(
				users,
				sessionTitle,
				eventTypeSelected,
				faculties,
				usageSelected,
				roomTypeSelected,
				roomSelected,
				startTimeSelected,
				endTimeSelected,
				courses,
				gears,
				locations
			);
		} else if (updateEvent) {
			await updateRecord(
				eventID,
				users,
				sessionTitle,
				eventTypeSelected,
				faculties,
				usageSelected,
				roomTypeSelected,
				roomSelected,
				startTimeSelected,
				endTimeSelected,
				courses,
				gears,
				locations
			);
		}
	};

	const handleClose = () => {
		setUserSelected([]);
		setSessionTitle("");
		setEventTypeSelected([]);
		setFacultySelected([]);
		setUsageSelected([]);
		setRoomTypeSelected([]);
		setRoomSelected([]);
		setStartTimeSelected("");
		setEndTimeSelected("");
		setCourseSelected([]);
		setGearSelected([]);
		setEventID("");

		setNewEvent(false);
		setUpdateEvent(false);
		setCancelEvent(false);

		setUserCount(0);
		setAddCourse(false);
		setAddGear(false);

		setOpen(false);
		window.location.reload();
	};

	return (
		<div style={containerStyle}>
			<Button
				variant="outlined"
				color="warning"
				onClick={handleSubmit}
				disabled={
					!(
						sessionTitle &&
						roomTypeSelected &&
						eventTypeSelected &&
						endTimeSelected &&
						startTimeSelected &&
						timeCorrect
					)
				}
			>
				SUBMIT
			</Button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={modalStyle}>
					<Typography id="modal-modal-title" sx={textStyle}>
						Submission Successful!
					</Typography>
					<Typography id="modal-modal-description" sx={textStyle}>
						Please check your inbox for booking confirmation.
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
