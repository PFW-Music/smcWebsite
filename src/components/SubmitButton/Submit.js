import React from "react";
import base from "../airtable";

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
			<button
				className={`${
					!(
						sessionTitle &&
						roomTypeSelected &&
						eventTypeSelected &&
						endTimeSelected &&
						startTimeSelected &&
						timeCorrect
					)
						? "bg-gray-300 cursor-not-allowed"
						: "bg-yellow-500 hover:bg-yellow-600"
				} text-white font-semibold py-2 px-4 border border-yellow-500 rounded`}
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
			</button>

			{open && (
				<div
					className="fixed z-10 inset-0 overflow-y-auto"
					aria-labelledby="modal-title"
					role="dialog"
					aria-modal="true"
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
							aria-hidden="true"
						></div>
						<div className="bg-black inline-block p-6 my-8 border border-yellow-500 text-white overflow-hidden shadow-xl transform transition-all">
							<h2
								id="modal-title"
								className="text-xl font-bold mb-2 text-white"
							>
								Submission Successful!
							</h2>
							<p>Please check your inbox for booking confirmation.</p>
							<button
								className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 border border-yellow-500 rounded mt-4"
								onClick={handleClose}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
