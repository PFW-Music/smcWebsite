import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Button } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const roundToNearestHalfHour = (date) => {
	const roundedMinutes = date.getMinutes() >= 30 ? 60 : 30;
	date.setMinutes(roundedMinutes);
	date.setSeconds(0);
	date.setMilliseconds(0);
	return date;
};

const addHours = (date, hours) => {
	return new Date(date.getTime() + hours * 60 * 60 * 1000);
};

const useTimeSelection = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());

	useEffect(() => {
		const roundedDate = roundToNearestHalfHour(new Date());
		setStartDate(roundedDate);
		setEndDate(addHours(roundedDate, 1));
	}, []);

	const handleDateChange = (type, date) => {
		if (type === "start") {
			setStartDate(date);
			setEndDate(addHours(date, 1));
		} else {
			setEndDate(date);
		}
	};

	return { startDate, endDate, handleDateChange };
};

const filterTemporallyUnavailableGear = (
	gearList,
	startTimeSelected,
	endTimeSelected
) => {
	const startTime = new Date(startTimeSelected);
	const endTime = new Date(endTimeSelected);

	return gearList.filter((gear) => {
		if (!gear.eventStart || !gear.eventEnd) return true;

		return !gear.eventStart.some((eventStart, idx) => {
			const eventEnd = gear.eventEnd[idx];
			const eventStartDate = new Date(eventStart);
			const eventEndDate = new Date(eventEnd);

			return (
				(startTime >= eventStartDate && startTime < eventEndDate) ||
				(endTime > eventStartDate && endTime <= eventEndDate) ||
				(startTime <= eventStartDate && endTime >= eventEndDate)
			);
		});
	});
};

const DatePickerSection = ({ startDate, endDate, handleDateChange }) => {
	return (
		<div className="flex flex-col items-center w-full">
			<h4 className="my-2">Select Start Date</h4>
			<DatePicker
				className="border rounded-md p-1"
				showIcon
				placeholderText="Select Start Date"
				showTimeSelect
				dateFormat="MMMM d, yyyy h:mmaa"
				selected={startDate}
				selectsStart
				startDate={startDate}
				endDate={endDate}
				onChange={(date) => handleDateChange("start", date)}
			/>

			<h4 className="my-2">Select End Date</h4>
			<DatePicker
				className="border rounded-md p-1"
				showIcon
				placeholderText="Select End Date"
				showTimeSelect
				dateFormat="MMMM d, yyyy h:mmaa"
				selected={endDate}
				selectsEnd
				startDate={startDate}
				endDate={endDate}
				minDate={startDate}
				filterTime={(time) => time > startDate}
				onChange={(date) => handleDateChange("end", date)}
			/>
		</div>
	);
};

const NotificationSection = ({
	roomUnavailable,
	successMsg,
	handleClose,
	unavailableRoom,
}) => {
	return (
		<>
			<Snackbar
				open={roomUnavailable}
				autoHideDuration={10}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert severity="error">Room is not available at inputted time!</Alert>
			</Snackbar>

			<Snackbar
				open={successMsg}
				autoHideDuration={500}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert severity="success">Room is available at inputted time</Alert>
			</Snackbar>
		</>
	);
};

const DateTimeValidation = ({
	setTimeCorrect,
	setStartTimeSelected,
	setEndTimeSelected,
	roomBookingRecord,
	gearList,
	setFilteredGearList,
}) => {
	const [roomUnavailable, setRoomUnavailable] = useState(false);
	const [successMsg, setSuccessMsg] = useState(false);
	const [unavailableRoom, setUnavailableRoom] = useState("");

	const { startDate, endDate, handleDateChange } = useTimeSelection();

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSuccessMsg(false);
	};

	const handleAvailabilityCheck = () => {
		const startTime = startDate.toISOString();
		const endTime = endDate.toISOString();

		const conflictFound = checkRoomAvailability(
			startTime,
			endTime,
			roomBookingRecord
		);

		if (conflictFound) {
			setRoomUnavailable(true);
			setSuccessMsg(false);
			setTimeCorrect(false);
		} else {
			setRoomUnavailable(false);
			setSuccessMsg(true);
			setTimeCorrect(true);

			setFilteredGearList(
				filterTemporallyUnavailableGear(gearList, startTime, endTime)
			);
		}

		setStartTimeSelected(startTime);
		setEndTimeSelected(endTime);
	};

	const checkRoomAvailability = (startTime, endTime, roomBookingRecord) => {
		let unavailableRoom = "";

		const isRoomAvailable = roomBookingRecord.every((record) => {
			if (record.eventStatus !== "Booked ✅") return true;

			return record.eventStart.every((eventStart, idx) => {
				const eventEnd = record.eventEnd[idx];

				const startTimeSelected = new Date(startTime);
				const endTimeSelected = new Date(endTime);
				const eventStartDate = new Date(eventStart);
				const eventEndDate = new Date(eventEnd);

				if (
					(startTimeSelected >= eventStartDate &&
						startTimeSelected < eventEndDate) ||
					(endTimeSelected > eventStartDate &&
						endTimeSelected <= eventEndDate) ||
					(startTimeSelected < eventStartDate && endTimeSelected > eventEndDate)
				) {
					unavailableRoom = record.name;
					return false;
				}
				return true;
			});
		});
		return isRoomAvailable;
	};

	return (
		<div>
			<DatePickerSection
				startDate={startDate}
				endDate={endDate}
				handleDateChange={handleDateChange}
			/>

			<div className="flex justify-center items-center my-4">
				<Button color="warning" auto ghost onClick={handleAvailabilityCheck}>
					check availability
				</Button>
			</div>
			<NotificationSection
				roomUnavailable={roomUnavailable}
				successMsg={successMsg}
				handleClose={handleClose}
				unavailableRoom={unavailableRoom}
			/>
		</div>
	);
};

export default DateTimeValidation;
