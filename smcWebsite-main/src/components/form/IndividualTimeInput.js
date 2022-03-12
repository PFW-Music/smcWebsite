import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar'; 
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// This will be used to store input data
var StartTime;
var EndTime;
var unavailableRoom;

function ISODateString(d) {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  if (d === null) return null;

  console.log(d.getHours());

  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    "T" +
    pad(d.getHours()) +
    ":" +
    pad(d.getUTCMinutes()) +
    ":" +
    "00.000Z"
  );
}

function Add5Hours (time) {
  var newTime = new Date(time);
  if (newTime.getHours() > 18) {
    newTime.setDate(newTime.getDate() + 1);
    newTime.setHours(newTime.getHours() - 19);
  } else {
    newTime.setHours(newTime.getHours() + 5);
  }
  newTime = newTime.toISOString();
  console.log("comparableTime:", newTime);
  return newTime;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" horizontal="center" {...props} />;
});

export default function DateTimeValidation({setTimeCorrect,
                                            setStartTimeSelected, 
                                            setEndTimeSelected}) {
  const [startValue, setSartValue] = React.useState(null);
  const [endValue, setEndValue] = React.useState(null);
  const [invalidTime, setInvalidTime] = React.useState(false);
  const [invalidFormat, setInvalidFormat] = React.useState(false);

  const handleFakeClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  }

  const EndTimeCheck = () => {

    //console.log("StartTime:", StartTime);
    //console.log("EndTime:", EndTime);
    /*
    if (StartTime && EndTime) {
    StartTime = Add5Hours(StartTime);
    EndTime = Add5Hours(EndTime);
    
    }
*/

    if (StartTime === "NaN-NaN-NaNTNaN:NaN:00.000Z" || EndTime === "NaN-NaN-NaNTNaN:NaN:00.000Z") {
      setInvalidFormat(true);
      setTimeCorrect(false);
    } 
    else { 
      setInvalidFormat(false);    

      if (StartTime > EndTime) {
        setInvalidTime(true);
        setTimeCorrect(false);
      }
      else {
        setInvalidTime(false);
        setTimeCorrect(true);
        setStartTimeSelected(StartTime);
        setEndTimeSelected(EndTime);

        console.log("StartTime:", StartTime);
        console.log("EndTime:", EndTime);
      }
  
    }
    return (
        <div>
        {invalidTime && 
          <Snackbar open={invalidTime} autoHideDuration={10} onClose={handleFakeClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error">Proposed end time should not exceed start time!</Alert>
          </Snackbar>
        }
        {invalidFormat && 
          <Snackbar open={invalidFormat} autoHideDuration={10} onClose={handleFakeClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error">Time format invalid!</Alert>
          </Snackbar>
        }
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>
        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <DateTimePicker
              clearable
              placeholder="Enter time"
              renderInput={(params) => <TextField {...params} />}
              label="Event start time"
              value={startValue}
              onChange={(newValue) => {
                setSartValue(newValue);    
                StartTime = ISODateString(newValue);
                if (StartTime && StartTime !== "NaN-NaN-NaNTNaN:NaN:00.000Z")
                    StartTime = Add5Hours(StartTime)
                console.log(StartTime);
                setTimeCorrect(false);
              }}
              minDate={new Date()}
              minTime={new Date(0, 0, 0, 8)}
              maxTime={new Date(0, 0, 0, 23, 59)}
            />
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <DateTimePicker
              renderInput={(params) => <TextField {...params} />}
              label="Proposed end time"
              value={endValue}
              onChange={(newValue) => {
                setEndValue(newValue);
                EndTime = ISODateString(newValue);
                if (EndTime && EndTime !== "NaN-NaN-NaNTNaN:NaN:00.000Z")
                    EndTime = Add5Hours(EndTime);
                console.log(EndTime);
                setTimeCorrect(false);
              }}
              minTimeMessage
              maxTimeMessage
              minDate={new Date()}
              minTime={new Date(0, 0, 0, 8)}
              maxTime={new Date(0, 0, 0, 23, 59)}
              clearable={true}
            />
          </FormControl>
        </div>
      </Stack>
      <EndTimeCheck />

    </LocalizationProvider>

  );
}
