import React from "react";
import { Button as NextButton } from "@nextui-org/react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material//Fade";
import Typography from "@mui/material/Typography";

// Async function to create a record
async function createRecord(fields) {
	try {
	  const response = await fetch('/api/createRecord', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(fields),
	  });
  
	  if (response.status === 201 || response.status === 200) {
		console.log('Record created successfully.');
	  } else {
		console.error('Failed to create record.'+fields);
	  }
	} catch (err) {
	  console.error(err);
	}
  }
  
  // Async function to update a record
async function updateRecord(eventID, fields) {
	try {
	  const response = await fetch(`/api/updateRecord/${eventID}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ fields }), // Only fields need to be sent
	  });
  
	  if (response.status === 200) {
		console.log('Record updated successfully.');
	  } else {
		console.error('Failed to update record.');
	  }
	} catch (err) {
	  console.error(err);
	}
  }

export default function Submit({
	userSelected,
	sessionTitle,
	eventTypeSelected,
	facultySelected,
	usageSelected,
	roomSelected,
	startTimeSelected,
	endTimeSelected,
	courseSelected,
	gearSelected,
	eventID,
	newEvent,
	updateEvent,
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
		const locations = roomBookingRecord?.map((obj) => obj.id);

		const fields = {
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
		};

		if (newEvent) {
			await createRecord(fields);
		} else if (updateEvent) {
			await updateRecord(eventID, fields);
		}
		console.log("Fields object:", fields);

	};

	const handleClose = () => {
		setUserCount(0);
		setAddCourse(false);
		setAddGear(false);

		setOpen(false);
		window.location.reload();
	};

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<NextButton
				shadow
				color="warning"
				onClick={handleSubmit}
				disabled={
					!(
						sessionTitle &&
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
