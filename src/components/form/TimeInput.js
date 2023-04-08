import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      horizontal="center"
      {...props}
    />
  );
});

const roundToNearestHalfHour = (date) => {
  const minutes = date.getMinutes();
  const roundedMinutes = minutes >= 30 ? 60 : 30;
  date.setMinutes(roundedMinutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const addHours = (date, hours) => {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
};

function filterTemporallyUnavailableGear(gearList, startTimeSelected, endTimeSelected) {
  let temporallyFilteredGear = [];
  let eventStart = null;
  let eventEnd = null;
  let conflictFound = false;

  for (let gearIndex = 0; gearIndex < gearList.length; gearIndex++) {
    conflictFound = false;

    //No events
    if (typeof gearList[gearIndex].eventStart === "undefined" || typeof gearList[gearIndex].eventEnd === "undefined"){
      temporallyFilteredGear.push(gearList[gearIndex]);
      continue;
    }

    //loop through start and end times
    for (let eventIndex = 0; eventIndex < gearList[gearIndex].eventStart.length && !conflictFound; eventIndex++){
      eventStart = gearList[gearIndex].eventStart[eventIndex];
      eventEnd = gearList[gearIndex].eventEnd[eventIndex];

      //Chosen start or end is in the middle of an existing event
      conflictFound = conflictFound || (startTimeSelected > eventStart && startTimeSelected < eventEnd);
      conflictFound = conflictFound || (endTimeSelected > eventStart && endTimeSelected < eventEnd);
      //Chosen start is before event and chosen end is after event
      conflictFound = conflictFound || (startTimeSelected < eventStart && endTimeSelected > eventEnd);
    }
    if (!conflictFound) {
      temporallyFilteredGear.push(gearList[gearIndex]);
    }
    // else {
    //   console.log(gearList[gearIndex]);
    // }
  }
  return temporallyFilteredGear;
}

function DateTimeValidation({
  setTimeCorrect,
  setStartTimeSelected,
  setEndTimeSelected,
                              roomBookingRecord,
                              gearList,
                              setFilteredGearList
}) {
  const [invalidTime, setInvalidTime] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomUnavailable, setRoomUnavailable] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [unavailableRoom, setUnavailableRoom] = useState("");

  useEffect(() => {
    const roundedDate = roundToNearestHalfHour(new Date());
    setStartDate(roundedDate);
    setStartTime(roundedDate.toISOString());

    const oneHourForward = addHours(roundedDate, 1);
    setEndDate(oneHourForward);
    setEndTime(oneHourForward.toISOString());
  }, []);

  const handleDateChange = (type, date) => {
    setTimeCorrect(false);
    if (type === "start") {
      setStartDate(date);
      const startTime = date.toISOString();
      setStartTime(startTime);

      const oneHourForward = addHours(date, 1);
      setEndDate(oneHourForward);
      setEndTime(oneHourForward.toISOString());
    } else {
      setEndDate(date);
      setEndTime(date.toISOString());
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMsg(false);
  };

  const checkAvailability = () => {
    let realEndTime;

    setInvalidTime(startTime > endTime);

    if (startTime > endTime) {
      setTimeCorrect(false);
      return;
    }
    setTimeCorrect(true);
    setStartTimeSelected(startTime);
    setEndTimeSelected(endTime);

    let conflictFound = false;

    if (typeof roomBookingRecord !== "undefined") {
      realEndTime = new Date(endTime);
      realEndTime.setHours(realEndTime.getHours());
      realEndTime = realEndTime.toISOString();

      for (let i = 0; !conflictFound && i < roomBookingRecord.length; i++) {
        if (typeof roomBookingRecord[i].eventStart == "undefined") continue;
        for (
          let j = 0;
          !conflictFound && j < roomBookingRecord[i].eventStart.length;
          j++
        ) {
          if (roomBookingRecord[i].eventStatus[j] !== "Booked ✅") continue;

          if (
            startTime <= roomBookingRecord[i].eventStart[j] &&
            realEndTime >= roomBookingRecord[i].eventEnd[j]
          ) {
            conflictFound = true;
            setUnavailableRoom(roomBookingRecord[i].name);
            break;
          } else if (
            startTime >= roomBookingRecord[i].eventStart[j] &&
            startTime <= roomBookingRecord[i].eventEnd[j]
          ) {
            conflictFound = true;
            setUnavailableRoom(roomBookingRecord[i].name);
            break;
          } else if (
            realEndTime > roomBookingRecord[i].eventStart[j] &&
            realEndTime < roomBookingRecord[i].eventEnd[j]
          ) {
            conflictFound = true;
            setUnavailableRoom(roomBookingRecord[i].name);
            break;
          }
        }
      }
    }

    if (conflictFound) {
      setRoomUnavailable(true);
      setSuccessMsg(false);
      setTimeCorrect(false);
    } else {
      setRoomUnavailable(false);
      setSuccessMsg(true);
      setTimeCorrect(true);
      setFilteredGearList(filterTemporallyUnavailableGear(gearList, startTime, realEndTime));

    }
  };

  return (
    <div>
      <Stack spacing={1}>
        <DatePickerSection
          startDate={startDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
        />
      </Stack>

      <Box justifyContent="center" alignItems="center">
        <br />
        <Button color="warning" auto ghost onClick={checkAvailability}>
          check availability
        </Button>
      </Box>
      <NotificationSection
        invalidTime={invalidTime}
        roomUnavailable={roomUnavailable}
        successMsg={successMsg}
        handleClose={handleClose}
        unavailableRoom={unavailableRoom}
      />
    </div>
  );
}

const DatePickerSection = ({ startDate, endDate, handleDateChange }) => {
  const filterEndTime = (time) => {
    if (startDate.toDateString() === time.toDateString()) {
      return time > startDate;
    }
    return true;
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h4>Select Start Date</h4>
      <DatePicker
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

      <h4>Select End Date</h4>
      <DatePicker
        showIcon
        placeholderText="Select End Date"
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mmaa"
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        filterTime={filterEndTime}
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
    <div>
      {roomUnavailable && (
        <Snackbar
          open={roomUnavailable}
          autoHideDuration={10}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="error">
            {unavailableRoom} is not available at inputted time!
          </Alert>
        </Snackbar>
      )}
      {successMsg && (
        <Snackbar
          open={successMsg}
          autoHideDuration={500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success">
            Room is available at inputted time
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default DateTimeValidation;