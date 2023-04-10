import React, { useState, useCallback } from "react";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

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

const CustomSnackbar = ({ open, onClose, severity, message }) => (
  <Snackbar
    open={open}
    autoHideDuration={500}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
  >
    <Alert severity={severity}>{message}</Alert>
  </Snackbar>
);

const CustomDatePicker = ({ label, selectedDate, onChange, ...rest }) => (
  <>
    <h4>{label}</h4>
    <DatePicker
      showIcon
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mmaa"
      selected={selectedDate}
      onChange={onChange}
      {...rest}
    />
  </>
);

export default function DateTimeValidation({
  setTimeCorrect,
  setStartTimeSelected,
  setEndTimeSelected,
  roomBookingRecord,
}) {
  const [startDate, setStartDate] = useState(
    roundToNearestHalfHour(new Date())
  );
  const [endDate, setEndDate] = useState(
    addHours(roundToNearestHalfHour(new Date()), 1)
  );
  const [invalidTime, setInvalidTime] = useState(false);
  const [invalidFormat, setInvalidFormat] = useState(false);
  const [roomUnavailable, setRoomUnavailable] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [unavailableRoom, setUnavailableRoom] = useState("");

  const handleStartDateChange = useCallback(
    (date) => {
      setTimeCorrect(false);
      setStartDate(date);
      setStartTimeSelected(date.toISOString());

      const oneHourForward = addHours(date, 1);
      setEndDate(oneHourForward);
      setEndTimeSelected(oneHourForward.toISOString());
    },
    [setEndTimeSelected, setStartTimeSelected, setTimeCorrect]
  );

  const handleEndDateChange = useCallback(
    (date) => {
      setTimeCorrect(false);
      setEndDate(date);
      setEndTimeSelected(date.toISOString());
    },
    [setEndTimeSelected, setTimeCorrect]
  );

  const handleClose = useCallback((event, reason) => {
    if (reason !== "clickaway") {
      setSuccessMsg(false);
    }
  }, []);
  const checkAvailability = useCallback(() => {
    const startTime = startDate.toISOString();
    const endTime = endDate.toISOString();

    if (!startTime || !endTime) {
      setInvalidFormat(true);
      setTimeCorrect(false);
      return;
    } else {
      setInvalidFormat(false);
    }

    if (
      startTime === "NaN-NaN-NaNTNaN:NaN:00.000Z" ||
      endTime === "NaN-NaN-NaNTNaN:NaN:00.000Z"
    ) {
      setInvalidFormat(true);
    } else {
      setInvalidFormat(false);

      if (startTime > endTime) {
        setInvalidTime(true);
        setTimeCorrect(false);
        return;
      } else {
        setInvalidTime(false);
        setTimeCorrect(true);
      }

      let conflictFound = false;

      if (roomBookingRecord) {
        const realEndTime = new Date(endTime);
        realEndTime.setHours(realEndTime.getHours());
        const realEndTimeISO = realEndTime.toISOString();

        for (const record of roomBookingRecord) {
          if (!record.eventStart) continue;

          for (const [index, start] of record.eventStart.entries()) {
            if (record.eventStatus[index] !== "Booked ✅") continue;

            const end = record.eventEnd[index];

            if (startTime <= start && realEndTimeISO >= end) {
              conflictFound = true;
              setUnavailableRoom(record.name);
              break;
            } else if (startTime >= start && startTime <= end) {
              conflictFound = true;
              setUnavailableRoom(record.name);
              break;
            } else if (realEndTimeISO > start && realEndTimeISO < end) {
              conflictFound = true;
              setUnavailableRoom(record.name);
              break;
            }
          }

          if (conflictFound) break;
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
  }, [startDate, endDate, roomBookingRecord, setTimeCorrect]);

  return (
    <div>
      <Stack spacing={1}>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CustomDatePicker
            label="Select Start Date"
            placeholderText="Select Start Date"
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={handleStartDateChange}
          />
          <CustomDatePicker
            label="Select End Date"
            placeholderText="Select End Date"
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            onChange={handleEndDateChange}
          />
          <Box justifyContent="center" alignItems="center">
            <br />
            <Button color="warning" auto ghost onClick={checkAvailability}>
              check availability
            </Button>
          </Box>
        </div>
      </Stack>

      <div>
        <CustomSnackbar
          open={invalidTime}
          onClose={handleClose}
          severity="error"
          message="Proposed start time should not exceed end time!"
        />
        <CustomSnackbar
          open={invalidFormat}
          onClose={handleClose}
          severity="error"
          message="Time format invalid!"
        />
        <CustomSnackbar
          open={roomUnavailable}
          onClose={handleClose}
          severity="error"
          message={`${unavailableRoom} is not available at inputted time!`}
        />
        <CustomSnackbar
          open={successMsg}
          onClose={handleClose}
          severity="success"
          message="Room is available at inputted time"
        />
      </div>
    </div>
  );
}
