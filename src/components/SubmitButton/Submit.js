import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import base from "../../airtable";

//create global variables here
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px", // You can adjust the gap between cards if needed
};

const style = {
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

async function CreateRecord(
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

async function UpdateRecord(
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

    // getting the IDs lists for linking fields
    const users = [];
    const faculties = [];
    const courses = [];
    const gears = [];
    const locations = [];

    if (userSelected) {
      userSelected.forEach(function (obj) {
        users.push(obj.id);
      });
    }
    if (facultySelected) {
      facultySelected.forEach(function (obj) {
        faculties.push(obj.id);
      });
    }
    if (courseSelected) {
      courseSelected.forEach(function (obj) {
        courses.push(obj.key);
      });
    }
    if (gearSelected) {
      gearSelected.forEach(function (obj) {
        gears.push(obj.id);
      });
    }
    if (roomBookingRecord) {
      roomBookingRecord.forEach(function (obj) {
        locations.push(obj.id);
      });
    }

    console.log(courses);
    // perform form action
    if (newEvent) {
      await CreateRecord(
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
      await UpdateRecord(
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
    console.log("checking error");
  };
  const handleClose = () => {
    // Clears all form fields
    // event record data
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

    // form actions
    setNewEvent(false);
    setUpdateEvent(false);
    setCancelEvent(false);

    // other display related variables
    setUserCount(0);
    setAddCourse(false);
    setAddGear(false);

    // slose the confirmation page
    setOpen(false);
    window.location.reload();
  };

  return (
    <div style={containerStyle}>
      <Button
        bordered
        color="warning"
        auto
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
        <Box sx={style}>
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
