import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "react-datetime/css/react-datetime.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

//TimeInput.js is for general time input, IndividualTimeInput.js is for gear time input

// This will be used to store input data
let StartTime;
let EndTime;
let unavailableRoom;

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

export default function DateTimeValidation({
                                             setTimeCorrect,
                                             setStartTimeSelected,
                                             setEndTimeSelected,
                                             roomBookingRecord
                                           }) {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [invalidTime, setInvalidTime] = React.useState(false);
  const [invalidFormat, setInvalidFormat] = React.useState(false);
  const [roomUnavailable, setRoomUnavailable] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(false);

  const handleStartDateChange = (date) => {
    setTimeCorrect(false);
    setStartDate(date);
    // console.log(formattedStartDate);
    StartTime = date.toISOString();
  };

  const handleEndDateChange = (date) => {
    setTimeCorrect(false);
    setEndDate(date);
    // console.log(formattedEndDate);
    EndTime = date.toISOString();
  };

  const handleFakeClose = (event, reason) => {
    if (reason === "clickaway") {
    }
  };

  const handleRealClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessMsg(false);
  };

  const EndTimeCheck = () => {
    if (!StartTime || !EndTime) {
      setInvalidFormat(true);
      setTimeCorrect(false);
      return;
    } else {
      setInvalidFormat(false);
    }

    if (
      StartTime === "NaN-NaN-NaNTNaN:NaN:00.000Z" ||
      EndTime === "NaN-NaN-NaNTNaN:NaN:00.000Z"
    ) {
      setInvalidFormat(true);
    } else {
      setInvalidFormat(false);

      if (StartTime > EndTime) {
        setInvalidTime(true);
        setTimeCorrect(false);
        return;
      } else {
        setInvalidTime(false);
        setTimeCorrect(true);
        setStartTimeSelected(StartTime);
        setEndTimeSelected(EndTime);
      }


      let conflictFound = false;

      if (typeof roomBookingRecord !== "undefined") {
        let realEndTime = new Date(EndTime);
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

            // User selected time is covering and existing session
            if (
              StartTime <= roomBookingRecord[i].eventStart[j] &&
              realEndTime >= roomBookingRecord[i].eventEnd[j]
            ) {
              conflictFound = true;
              unavailableRoom = roomBookingRecord[i].name;
              break;
            }
            // User selected start time is during an existing session
            else if (
              StartTime >= roomBookingRecord[i].eventStart[j] &&
              StartTime <= roomBookingRecord[i].eventEnd[j]
            ) {
              conflictFound = true;
              unavailableRoom = roomBookingRecord[i].name;
              break;
            }
            // User selected end time is during an existing session
            else if (
              realEndTime > roomBookingRecord[i].eventStart[j] &&
              realEndTime < roomBookingRecord[i].eventEnd[j]
            ) {
              conflictFound = true;
              unavailableRoom = roomBookingRecord[i].name;
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
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>


        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center"
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
            onChange={handleStartDateChange}
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
            onChange={handleEndDateChange}
          />
        </div>
      </Stack>

      <Box justifyContent="center" alignItems="center">
        <br />
        <Button
          sx={{
            backgroundColor: "rgba(207,185,145)",
            "&:hover": { backgroundColor: "#7a6d55" }
          }}
          variant="contained"
          onClick={EndTimeCheck}
        >
          check availability
        </Button>
      </Box>
      <div>
        {invalidTime && (
          <Snackbar
            open={invalidTime}
            autoHideDuration={10}
            onClose={handleFakeClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error">
              Proposed start time should not exceed end time!
            </Alert>
          </Snackbar>
        )}
        {invalidFormat && (
          <Snackbar
            open={invalidFormat}
            autoHideDuration={10}
            onClose={handleFakeClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error">Time format invalid!</Alert>
          </Snackbar>
        )}
        {roomUnavailable && (
          <Snackbar
            open={roomUnavailable}
            autoHideDuration={10}
            onClose={handleFakeClose}
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
            onClose={handleRealClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success">Room is available at inputted time</Alert>
          </Snackbar>
        )}
      </div>
    </LocalizationProvider>
  );
}
