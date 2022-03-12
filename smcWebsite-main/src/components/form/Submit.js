import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';  
import NameInput from './NameInput'; 
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { styled } from "@mui/styles";


var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base('appYke0X4d4wy6GUx');



const SubmitButton = styled(Button)({
  background: "linear-gradient(45deg, #555960 99%, #000000 1%)", //"linear-gradient(45deg, #4568dc 30%, #b06ab3 90%)",
  border: 0,
  borderRadius: 4,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});


//create global variables here

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: '#e7dcc8',
  outline:0, 
  boxShadow: 20,
  p: 4,
  color: '#191b1d',
};

function CreateRecord(users,
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
                      locations) {

  base('Events').create([
    {
      "fields": {
        "Event Name": sessionTitle, //Need to be changed for a new record to be created
        "Start Time": startTimeSelected,
        "Proposed End Time": endTimeSelected,
        "🚪 Room(s)": roomSelected,
        "Class": courses,
        "Event Type": eventTypeSelected,
        "Faculty": faculties,
        "Students": users,
        "Status": "Booked ✅",
        "Intent of Use": usageSelected,
        "Gear Selection" : gears,
        "Location": locations
        
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
  });
}


function UpdateRecord(eventID,
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
                      locations) {

  
base('Events').update([
  {
    "id": eventID,
    "fields": {
      "Event Name": sessionTitle,
      "Start Time": startTimeSelected,
      "Proposed End Time": endTimeSelected,
      "🚪 Room(s)": roomSelected,
      "Class": courses,
      "Event Type": eventTypeSelected,
      "Students": users,
      "Faculty": faculties,
      "Status": "Booked ✅",
      "Intent of Use": usageSelected,
      "Gear Selection" : gears,
      "Location": locations
    }
  }
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function(record) {
    console.log("record updated");
  });
});
}

export default function Submit({userSelected, setUserSelected,
                                sessionTitle, setSessionTitle,
                                eventTypeSelected, setEventTypeSelected,
                                facultySelected, setFacultySelected,
                                usageSelected, setUsageSelected,
                                roomTypeSelected, setRoomTypeSelected,
                                roomSelected, setRoomSelected,
                                startTimeSelected, setStartTimeSelected,
                                endTimeSelected, setEndTimeSelected,
                                courseSelected, setCourseSelected,
                                gearSelected, setGearSelected,

                                eventID, setEventID,
                                newEvent, setNewEvent,
                                updateEvent, setUpdateEvent,
                                CancelEvent, setCancelEvent,
                                timeCorrect,
                                setUserCount,
                                setAddCourse,
                                setAddGear,
                                roomBookingRecord
                                }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const handleSubmit = () => {
    setOpen(true);

    // getting the IDs lists for linking fields
    var users = [];
    var faculties = [];
    var courses = [];
    var gears = [];
    var locations = [];

    if (userSelected) {
      userSelected.forEach(function(obj){
          users.push(obj.id);
      })
    }
    if (facultySelected) {
      facultySelected.forEach(function(obj){
        faculties.push(obj.id);
      })
    }
    if (courseSelected) {
      courseSelected.forEach(function(obj){
        courses.push(obj.key);
      })
    }
    if (gearSelected) {
      gearSelected.forEach(function(obj){
        gears.push(obj.id);
      })
    }
    if (roomBookingRecord) {
      roomBookingRecord.forEach(function(obj){
        locations.push(obj.id);
      })
    }

    console.log(courses);
    // perform form action
    if (newEvent) {
      CreateRecord(
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
        locations);
    }
    else if (updateEvent) {
      UpdateRecord(
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
        locations);

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
  }


  return (
    <div>
      <SubmitButton 
      variant="contained" 
      disabled={!(sessionTitle && roomTypeSelected && eventTypeSelected && endTimeSelected && startTimeSelected && timeCorrect)}
      onClick={handleSubmit}>
        SUBMIT
      </SubmitButton>   

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submission Successful!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please check your inbox for booking confirmation.
          </Typography>
        </Box>

      </Modal>
    </div>
  );
}