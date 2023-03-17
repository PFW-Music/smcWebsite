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

// function ISODateString(d) {
//   function pad(n) {
//     return n < 10 ? "0" + n : n;
//   }
//
//   if (d === null) return null;
//
//   console.log(d.getHours());
//
//   return (
//     d.getUTCFullYear() +
//     "-" +
//     pad(d.getUTCMonth() + 1) +
//     "-" +
//     pad(d.getDate()) +
//     "T" +
//     pad(d.getHours()) +
//     ":" +
//     pad(d.getUTCMinutes()) +
//     ":" +
//     "00.000Z"
//   );
// }

{
  /**
   Daylight savings time changes are made in this section. The values in this comment were working on the given dates:
   March 13, 2022 - November 6, 2022:
   line 63 newTime.getHours() > 19
   line 64 newTime.setDate(newTime.getDate() + 1);
   line 65 newTime.setHours(newTime.getHours() - 20);
   line 67 newTime.setHours(newTime.getHours() + 4)

   Nov 7, 2022 - March 11, 2023: (the current)
   line 63 newTime.getHours() > 18
   line 64 newTime.setDate(newTime.getDate() + 1);
   line 65 newTime.setHours(newTime.getHours() - 19);
   line 67 newTime.setHours(newTime.getHours() + 5)

   Sorry we couldn't work the switching issue into our solution, good luck.
   */
}

// function Add5Hours(time) {
//   let newTime = new Date(time);
//
//   // Check if we are in daylight savings time
//   const today = new Date();
//   const dstStart = new Date(today.getFullYear(), 2, 14);
//   const dstEnd = new Date(today.getFullYear(), 10, 7);
//   const dst =
//     today > dstStart && today < dstEnd
//       ? new Date().getTimezoneOffset() / 60 + 1
//       : 0;
//
//   if (newTime.getHours() > 18 + dst) {
//     newTime.setDate(newTime.getDate() + 1);
//     newTime.setHours(newTime.getHours() - 19 - dst);
//   } else {
//     newTime.setHours(newTime.getHours() + 5 + dst);
//   }
//
//   newTime = newTime.toISOString();
//   return newTime;
// }

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
  roomBookingRecord,
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
    const formattedStartDate = date.toISOString();
    // console.log(formattedStartDate);
    StartTime = formattedStartDate;
  };

  const handleEndDateChange = (date) => {
    setTimeCorrect(false);
    setEndDate(date);
    const formattedEndDate = date.toISOString();
    // console.log(formattedEndDate);
    EndTime = formattedEndDate;
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

      //StartTime = Add5Hours(StartTime);
      //EndTime = Add5Hours(EndTime);
      //console.log("comparableStartTime:", StartTime);
      //console.log("comparableEndTime:", EndTime);

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
        {/*<div>*/}
        {/*  <FormControl sx={{ m: 1, width: 400 }}>*/}
        {/*    <div style={{ display: "flex" }}>*/}
        {/*      <DateTimePicker*/}
        {/*        clearable*/}
        {/*        placeholder="Enter time"*/}
        {/*        renderInput={(params) => <TextField {...params} />}*/}
        {/*        label="Event start time"*/}
        {/*        value={startValue}*/}
        {/*        onChange={(newValue) => {*/}
        {/*          setSartValue(newValue);*/}
        {/*          StartTime = ISODateString(newValue);*/}
        {/*          if (StartTime && StartTime !== "NaN-NaN-NaNTNaN:NaN:00.000Z")*/}
        {/*            StartTime = Add5Hours(StartTime);*/}
        {/*          console.log(StartTime);*/}
        {/*          setTimeCorrect(false);*/}
        {/*        }}*/}
        {/*        minDate={new Date()}*/}
        {/*        minTime={new Date(0, 0, 0, 8)}*/}
        {/*        maxTime={new Date(0, 0, 0, 23, 59)}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </FormControl>*/}
        {/*</div>*/}

        {/*<div>*/}
        {/*  <FormControl sx={{ m: 1, width: 400 }}>*/}
        {/*    <DateTimePicker*/}
        {/*      renderInput={(params) => <TextField {...params} />}*/}
        {/*      label="Proposed end time"*/}
        {/*      value={endValue}*/}
        {/*      onChange={(newValue) => {*/}
        {/*        setEndValue(newValue);*/}
        {/*        EndTime = ISODateString(newValue);*/}
        {/*        if (EndTime && EndTime !== "NaN-NaN-NaNTNaN:NaN:00.000Z")*/}
        {/*          EndTime = Add5Hours(EndTime);*/}
        {/*        console.log(EndTime);*/}
        {/*        setTimeCorrect(false);*/}
        {/*      }}*/}
        {/*      minTimeMessage*/}
        {/*      maxTimeMessage*/}
        {/*      minDate={new Date()}*/}
        {/*      minTime={new Date(0, 0, 0, 8)}*/}
        {/*      maxTime={new Date(0, 0, 0, 23, 59)}*/}
        {/*      clearable={true}*/}
        {/*    />*/}
        {/*  </FormControl>*/}
        {/*</div>*/}

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
            // isClearable
            // filterDate={(d) => {
            //   return new Date() > d;
            // }}
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
            //isClearable
            // filterDate={(d) => {
            //   return new Date() > d;
            // }}
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
            "&:hover": { backgroundColor: "#7a6d55" },
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
            autoHideDuration={2000}
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
