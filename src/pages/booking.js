import React from "react";
import { useState, useEffect } from "react";
import NameInput from "../components/NameInput";
import EventDetailsInput from "../components/EventDetailsInput";
import RoomSelection from "../components/RoomSelection";
import TimeInput from "../components/TimeInput";
import GearCheckOut from "../components/GearCheckOut";
import CourseInput from "../components/CourseInput";
import FormActions from "../components/FormActions";
import EventID from "../components/EventID";
import Submit from "../components/Submit";
import IframeSlide from "../components/IframeSlide";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { Container, Card, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router"


let peopleAllInfo = [];
let facultyList = [];
let user;

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
			<Row className="text-xl" justify="center" align="center">
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

async function getPeople(){
	try {
		const response = await fetch("/api/air/GetPeople");
		const people = await response.json();
		peopleAllInfo = people.peopleAllInfo.map((item) => item);
		facultyList = people.facultyList.map((item) => item);
	} catch (error) {
		console.log(error);
	}
}

async function getStudio(){
	const response = await fetch("/api/air/get-rooms/studio");
	const rooms = await response.json();
	RecordingStudioRoomsList = rooms.map((item) => item);
}

async function getRehearsal(){
	const response = await fetch("/api/air/get-rooms/rehearsal");
	const rooms = await response.json();
	RehearsalRoomsList = rooms.map((item) => item);
}


export default  function Home() {
	const [userSelected, setUserSelected] = React.useState([""]);
	const [sessionTitle, setSessionTitle] = React.useState("");
	const [eventTypeSelected, setEventTypeSelected] = React.useState([]);
	const [facultySelected, setFacultySelected] = React.useState([]);
	const [usageSelected, setUsageSelected] = React.useState([]);
	const [roomTypeSelected, setRoomTypeSelected] = React.useState([]);
	const [roomSelected, setRoomSelected] = React.useState([]);
	const [startTimeSelected, setStartTimeSelected] = React.useState("");
	const [endTimeSelected, setEndTimeSelected] = React.useState("");
	const [courseSelected, setCourseSelected] = React.useState([]);
	const [gearSelected, setGearSelected] = React.useState([]);

	const [IDerror, setIDError] = React.useState(false);
	const [eventID, setEventID] = React.useState("");
	const [goodID, setGoodID] = React.useState(false);

	const [userCount, setUserCount] = React.useState(1);
	const [disabledRoomTypes, setDisabledRoomTypes] = React.useState([]);
	const [timeCorrect, setTimeCorrect] = React.useState(false);
	const [gearList, setGearList] = React.useState([]);
	const [filteredGearList, setFilteredGearList] = React.useState([]);
	const [roomBookingRecord, setRoomBookingRecord] = React.useState([]);

	const [addGear, setAddGear] = React.useState(false);
	const [addCourse, setAddCourse] = React.useState(false);

	const [newEvent, setNewEvent] = React.useState(false);
	const [updateEvent, setUpdateEvent] = React.useState(false);
	const [CancelEvent, setCancelEvent] = React.useState(false);

	const [RecordingStudioRoomsList, setRecordingStudioRoomsList] = useState([]);
	const [RehearsalRoomsList, setRehearsalRoomsList] = useState([]);
    const [ECRoomsList, setECRoomsList] = useState([]);
	const [userExists, setUserExist] = useState(false);
	const [spinner, setSpinner] = useState(false); 

	useEffect(() => {
		//getPeople();
		//getStudio();
		setSpinner(true);
		fetch('/api/air/GetUser')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.Permission === true) {
					user = data.user;
					setUserExist(true);
					setSpinner(false);
				}
				else if (data.Permission === false) {
					setSpinner(false);
					setUserExist(false);
				}
			})
		fetch("/api/air/get-rooms/studio")
		.then((res)=>res.json())
		.then((data)=>{
			setRecordingStudioRoomsList(data);
		})
        fetch("/api/air/get-rooms/rehearsal")
		.then((res)=>res.json())
		.then((data)=>{
			setRehearsalRoomsList(data);
		})
        fetch("/api/air/get-rooms/edit-and-collab")
		.then((res)=>res.json())
		.then((data)=>{
			setECRoomsList(data);
		})



	  }, []); 
	const nameInput = (
		<InputSection
			title="Who is booking?"
			description="i.e. takes all responsibility!"
		>
			<NameInput
				user={user}
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

	const roomInput = (
		<InputSection
			title="Room Selection"
			description="📌 If the Edit & Collaboration Spaces is selected, option to add gear(s) to your booking will be available at the end of the form."
		>
			<RoomSelection
				roomOptionStudio={RecordingStudioRoomsList}
				roomOptionRehearsal={RehearsalRoomsList}
				roomOptionECspace={ECRoomsList}
				disabledRoomTypes={disabledRoomTypes}
				setRoomTypeSelected={setRoomTypeSelected}
				setRoomSelected={setRoomSelected}
				roomBookingRecord={roomBookingRecord}
				setRoomBookingRecord={setRoomBookingRecord}
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
				roomBookingRecord={roomBookingRecord}
				gearList={gearList}
				setFilteredGearList={setFilteredGearList}
			/>
		</InputSection>
	);

	const courseInput = (
		<InputSection title="Courses">
			<CourseInput
				setCourseSelected={setCourseSelected}
				addCourse={addCourse}
				setAddCourse={setAddCourse}
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
	if(spinner){
		return(
			<Box sx={{ width: '100%' }}>
			<LinearProgress />
		  </Box>
			
		);
	}
	if(!userExists){
    	return (
			<div className="flex flex-col items-center justify-center bg-neutral-900 w-full ">
			
			<Alert severity="error">
			  <AlertTitle>Error</AlertTitle>
			  Looks like user is not registered in the system. — <strong>An Email is sent to the Administrator to get this fixed!</strong>
			</Alert>
		
		  
		  </div>
		);
	}

	return (
		<div className="text-center bg-neutral-900 min-h-screen">
			<div className="mx-auto max-w-2xl">
				<SMCHours />
				{formActions}
				<Collapse in={newEvent || (updateEvent && goodID)}>
					{nameInput}
					{userCount > 0 && (
						<div>
							<IframeSlide src="https://airtable.com/embed/shr7XfOauvLgRzajc" />
							{eventDetailsInput}
							{roomInput}
							{roomSelected.length !== 0 && timeInput}
							{courseInput}
							{timeCorrect && gearInput}
						</div>
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
						roomTypeSelected={roomTypeSelected}
						setRoomTypeSelected={setRoomTypeSelected}
						roomSelected={roomSelected}
						setRoomSelected={setRoomSelected}
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
						roomBookingRecord={roomBookingRecord}
					/>
				)}
			</div>
		</div>
	);
}
