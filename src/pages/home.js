import React, { useEffect, useState } from "react";
import baserow from "../components/baserow"
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
import HeaderWithSubtitle from "../components/HeaderWithSubtitle";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";
import { Container, Card, Row, Text } from "@nextui-org/react";

let peopleAllInfo = [];
let SMCpeople = [];
let facultyList = [];

const fetchPeopleData = async () => {
  try {
    const tableID = 212624; // Replace with your Baserow table ID
    const table = baserow.table(tableID);

    if (!table) {
      throw new Error("The table object is not initialized");
    }

    const params = {
      //   page: 1,
      //   size: 100,
      // Add other parameters as needed, e.g., search, orderBy, orderDir
    };

    const response = await table.list(params);

    if (Array.isArray(response)) {
      SMCpeople = [];
      peopleAllInfo = [];
      facultyList = [];

      response.forEach((recordItem) => {
        const record = recordItem.record;
        let roles = [];

        if (record["Role"] && Array.isArray(record["Role"])) {
          roles = record["Role"].map((role) => role.value);
        }

        const fullName = [record["First Name"], record["Last Name"]]
          .filter(Boolean)
          .join(" ");
        SMCpeople.push({ name: fullName, id: record.id });

        const roomAccess = record["Room Access"]
          ? record["Room Access"].value
          : null;
        const gearAccess = record["Gear Access"]
          ? record["Gear Access"].value
          : null;

        peopleAllInfo.push({
          id: record.id,
          name: fullName,
          roomAccess: roomAccess,
          gearAccess: gearAccess,
          phoneNum: record["Phone"],
        });

        if (roles.includes("Faculty/Staff 🎓")) {
          facultyList.push({ name: fullName, id: record.id });
        }
      });

      // Now you can use SMCpeople, peopleAllInfo, and facultyList as needed
    //   console.log(SMCpeople);
    //   console.log(peopleAllInfo);
    //   console.log(facultyList);
    } else {
      throw new Error("Invalid response format: expected an array of records.");
    }
  } catch (error) {
    console.error("Error fetching SMC People data from Baserow:", error);
  }
};

// Call the fetchPeopleData function to initiate the data retrieval
fetchPeopleData();



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
  const [roomTypeSelected, setRoomTypeSelected] = React.useState([]);
  const [roomSelected, setRoomSelected] = React.useState([]);
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
  const [roomBookingRecord, setRoomBookingRecord] = React.useState([]);

  const [addGear, setAddGear] = React.useState(false);
  const [addCourse, setAddCourse] = React.useState(false);

  const [newEvent, setNewEvent] = React.useState(false);
  const [updateEvent, setUpdateEvent] = React.useState(false);
  const [CancelEvent, setCancelEvent] = React.useState(false);

  // Define states for room lists
  const [recordingStudioRooms, setRecordingStudioRooms] = useState([]);
  const [rehearsalRooms, setRehearsalRooms] = useState([]);
  const [ecRooms, setEcRooms] = useState([]);

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

  const roomInput = (
    <InputSection
      title="Room Selection"
      description="📌 If the Edit & Collaboration Spaces is selected, option to add gear(s) to your booking will be available at the end of the form."
    >
      <RoomSelection
        roomOptionStudio={recordingStudioRooms}
        roomOptionRehearsal={rehearsalRooms}
        roomOptionECspace={ecRooms}
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

  const fetchRoomsData = async (apiRoute) => {
	try {
	  const response = await fetch(`/api/${apiRoute}`);
	  const data = await response.json();
  
	  if (data && data.results) {
		const rooms = data.results.map((room) => ({
		  key: room.id,
		  name: room.Name,
		  events: room.Events, // Adjust this if the structure is different
		}));
  
		// Update state based on the API route
		if (apiRoute === "studio") {
		  console.log("Fetched studio rooms data:", rooms);
		  setRecordingStudioRooms(rooms);
		} else if (apiRoute === "rehearsal") {
		  setRehearsalRooms(rooms);
		} else if (apiRoute === "edit_collab") {
		  setEcRooms(rooms);
		}
	  } else {
		throw new Error(
		  "Invalid response format: expected 'results' in response."
		);
	  }
	} catch (error) {
	  console.error(`Error fetching room data from ${apiRoute}:`, error);
	}
  };

  useEffect(() => {
    // Call the function to fetch data when the component mounts
    fetchPeopleData();
    fetchRoomsData("studio");
    fetchRoomsData("rehearsal");
    fetchRoomsData("edit_collab");
  }, []);

  return (
    <div className="text-center bg-neutral-900 min-h-screen">
      <div className="mx-auto max-w-2xl">
        <HeaderWithSubtitle
          title="Schedule SMC Events"
          subtitle="Everyone can take advantage of scheduling time in the edit &
  collaboration spaces in the SMC building. Approved students
  registered for certain classes have privileges to schedule time in
  the recording studio, rehearsal room and control room."
        />
        <SMCHours />
        {formActions}
        <Collapse in={newEvent || (updateEvent && goodID)}>
          {nameInput}
          {userCount > 0 && (
            <div>
              <IframeSlide src="https://airtable.com/embed/shr7XfOauvLgRzajc" />
              <IframeSlide src="https://baserow.io/public/calendar/Af_TFnmy4569RwnAVDp7ErFB82F3ScK5DIU1bMsySP0" />
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
