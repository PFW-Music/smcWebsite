import React from "react";
import base from "../airtable";
import { Button as NextButton } from "@nextui-org/react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material//Fade";
import Typography from "@mui/material/Typography";
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
		<div className="flex flex-col items-center justify-center gap-4">
			<NextButton
				bordered
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
			</NextButton>

			<Modal
				className="flex items-center justify-center"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className="bg-neutral-900 inline-block p-6 my-8 border border-yellow-500 text-white overflow-hidden shadow-xl transform transition-all">
						<Typography variant="h5" className="font-bold mb-2">
							Submission Successful!
						</Typography>
						<Typography>
							Please check your inbox for booking confirmation.
						</Typography>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
