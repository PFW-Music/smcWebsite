import React from "react";
import base from "../components/airtable";
import NameInput from "../components/NameInput";
import EventDetailsInput from "../components/EventDetailsInput";
import TimeInput from "../components/TimeInput";
import GearCheckOut from "../components/GearCheckOut";
import FormActions from "../components/FormActions";
import EventID from "../components/EventID";
import Submit from "../components/Submit";
import IframeSlide from "../components/IframeSlide";
import HeaderWithSubtitle from "../components/HeaderWithSubtitle";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";
import { Container, Card, Row, Text } from "@nextui-org/react";

const peopleAllInfo = [];
const SMCpeople = [];
const facultyList = [];

base("SMC People")
	.select({
		view: "ALL PEOPLE",
	})
	.eachPage(
		function page(records, fetchNextPage) {
			records.forEach(function (record) {
				SMCpeople.push({ name: record.get("Person"), id: record.id });
				peopleAllInfo.push({
					id: record.id,
					name: record.get("Person"),
					roomAccess: record.get("Room Access"),
					gearAccess: record.get("Gear Access"),
					phoneNum: record.get("Phone"),
				});

				if (record.get("Role").includes("Faculty/Staff 🎓")) {
					facultyList.push({ name: record.get("Person"), id: record.id });
				}
			});

			fetchNextPage();
		},
		function done(err) {
			if (err) {
				console.error(err);
			}
		}
	);

const InputSection = ({ title, description, children }) => (
	<Paper className="my-2 mx-auto p-2">
		<Box className="text-center m-2 text-xl">{title}</Box>
		{description && (
			<Box className="text-sm">
				<FormLabel component="legend" className="ml-4">
					{description}
				</FormLabel>
			</Box>
		)}
		{children}
	</Paper>
);

const SMCHours = () => (
	<Container className="bg-neutral-900 text-white flex items-center justify-center">
		<Card.Body>
			<Text className="text-center text-2xl">SMC Hours & Availability</Text>
			<Row className="text-xl justify-center">
				<div className="columns-1">
					<Text>Monday — Friday: </Text>
					<Text>8:00 AM — Midnight</Text>
				</div>
				<div className="columns-2" />
				<div className="Columns-3">
					<Text>Saturday & Sunday: </Text>
					<Text>12:00 PM — Midnight</Text>
				</div>
			</Row>
		</Card.Body>
	</Container>
);

export default function Home() {
	const [userSelected, setUserSelected] = React.useState([]);
	const [sessionTitle, setSessionTitle] = React.useState("");
	const [eventTypeSelected, setEventTypeSelected] = React.useState([]);
	const [facultySelected, setFacultySelected] = React.useState([]);
	const [usageSelected, setUsageSelected] = React.useState([]);
	const [startTimeSelected, setStartTimeSelected] = React.useState("");
	const [endTimeSelected, setEndTimeSelected] = React.useState("");
	const [courseSelected, setCourseSelected] = React.useState([]);
	const [gearSelected, setGearSelected] = React.useState([]);

	const [IDerror, setIDError] = React.useState(false);
	const [eventID, setEventID] = React.useState("");
	const [goodID, setGoodID] = React.useState(false);

	const [userCount, setUserCount] = React.useState(0);
	const [disabledRoomTypes, setDisabledRoomTypes] = React.useState([]);
	const [timeCorrect, setTimeCorrect] = React.useState(false);
	const [gearList, setGearList] = React.useState([]);
	const [filteredGearList, setFilteredGearList] = React.useState([]);

	const [addGear, setAddGear] = React.useState(false);
	const [addCourse, setAddCourse] = React.useState(false);

	const [newEvent, setNewEvent] = React.useState(false);
	const [updateEvent, setUpdateEvent] = React.useState(false);
	const [CancelEvent, setCancelEvent] = React.useState(false);

	const nameInput = (
		<InputSection
			title="Who is booking?"
			description="i.e. takes all responsibility!"
		>
			<NameInput
				peopleAllInfo={peopleAllInfo}
				userSelected={userSelected}
				setUserSelected={setUserSelected}
				setUserCount={setUserCount}
				setDisabledRoomTypes={setDisabledRoomTypes}
				setGearList={setGearList}
			/>
		</InputSection>
	);

	const eventDetailsInput = (
		<InputSection title="Event Details">
			<EventDetailsInput
				facultyList={facultyList}
				setSessionTitle={setSessionTitle}
				setEventTypeSelected={setEventTypeSelected}
				setFacultySelected={setFacultySelected}
				setUsageSelected={setUsageSelected}
			/>
		</InputSection>
	);

	const timeInput = (
		<InputSection
			title="Session Time"
			description="📌 Based on your chosen Session Time, we wil notify you with the availability of the room(s) selected above."
		>
			<TimeInput
				setStartTimeSelected={setStartTimeSelected}
				setEndTimeSelected={setEndTimeSelected}
				setTimeCorrect={setTimeCorrect}
				gearList={gearList}
				setFilteredGearList={setFilteredGearList}
			/>
		</InputSection>
	);

	const gearInput = (
		<InputSection title="Gear Checkout">
			<GearCheckOut
				gearSelected={gearSelected}
				setGearSelected={setGearSelected}
				gearList={filteredGearList}
				addGear={addGear}
				setAddGear={setAddGear}
				startTimeSelected={startTimeSelected}
				endTimeSelected={endTimeSelected}
			/>
		</InputSection>
	);

	const formActions = (
		<Box className="m-auto">
			<FormActions
				setNewEvent={setNewEvent}
				setUpdateEvent={setUpdateEvent}
				setCancelEvent={setCancelEvent}
				setEventID={setEventID}
				setIDError={setIDError}
				setGoodID={setGoodID}
				setUserSelected={setUserSelected}
			/>
		</Box>
	);

	const requestEventID = (
		<InputSection
			className="m-auto"
			title="Event Record ID"
			description="Please enter the Event Record ID you received in the confirmation email before proceeding to the rest of the form."
		>
			<EventID
				IDerror={IDerror}
				setIDError={setIDError}
				eventID={eventID}
				setEventID={setEventID}
				goodID={goodID}
				setGoodID={setGoodID}
				updateEvent={updateEvent}
				CancelEvent={CancelEvent}
			/>
		</InputSection>
	);

	return (
		<div className="text-center bg-neutral-900 min-h-screen">
			<div className="mx-auto max-w-2xl">
				<HeaderWithSubtitle
					title="Select Gear"
					subtitle="Add users to see a list of gear available to your access level in the
					Select Gear menu."
				/>
				<SMCHours />
				{formActions}
				<Collapse in={newEvent || (updateEvent && goodID)}>
					{nameInput}
					{userCount > 0 && (
						<>
							<IframeSlide src="https://airtable.com/embed/shr7XfOauvLgRzajc" />
							{eventDetailsInput}
							{timeInput}

							{timeCorrect && gearInput}
						</>
					)}
				</Collapse>
				{(updateEvent || CancelEvent) && (
					<Collapse in>{requestEventID}</Collapse>
				)}
				{userCount > 0 && (newEvent || (updateEvent && goodID)) && (
					<Submit
						userSelected={userSelected}
						setUserSelected={setUserSelected}
						sessionTitle={sessionTitle}
						setSessionTitle={setSessionTitle}
						eventTypeSelected={eventTypeSelected}
						setEventTypeSelected={setEventTypeSelected}
						facultySelected={facultySelected}
						setFacultySelected={setFacultySelected}
						usageSelected={usageSelected}
						setUsageSelected={setUsageSelected}
						startTimeSelected={startTimeSelected}
						setStartTimeSelected={setStartTimeSelected}
						endTimeSelected={endTimeSelected}
						setEndTimeSelected={setEndTimeSelected}
						courseSelected={courseSelected}
						setCourseSelected={setCourseSelected}
						gearSelected={gearSelected}
						setGearSelected={setGearSelected}
						eventID={eventID}
						setEventID={setEventID}
						newEvent={newEvent}
						setNewEvent={setNewEvent}
						updateEvent={updateEvent}
						setUpdateEvent={setUpdateEvent}
						CancelEvent={CancelEvent}
						setCancelEvent={setCancelEvent}
						setAddCourse={setAddCourse}
						setAddGear={setAddGear}
						setUserCount={setUserCount}
						timeCorrect={timeCorrect}
					/>
				)}
			</div>
		</div>
	);
}
