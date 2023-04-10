import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// This will be used to store input data
let userGear;
let unavailableGear;

const embedStyle = {
  background: "transparent",
  border: "",
};

const iFrameGear = (
  <iframe
    className="airtable-embed"
    src="https://airtable.com/embed/shrmH9r8B0Zd8LwcU?backgroundColor=red"
    sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
    loading="lazy"
    width="100%"
    height="533"
    style={embedStyle}
  />
);

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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

export default function GearCheckOut({
  setGearSelected,
  gearList,
  gear,
  setGear,
  startTimeSelected,
  endTimeSelected,
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [gearUnavailable, setGearUnavailable] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState(false);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...gearList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, gearList]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleFakeClose = (event, reason) => {
    if (reason === "click away") {
    }
  };

  const handleRealClose = (event, reason) => {
    if (reason === "click away") {
      return;
    }
    setSuccessMsg(false);
  };

  const availabilityCheck = () => {
    let gears = userGear;
    let StartTime = startTimeSelected;
    let EndTime = endTimeSelected;

    let conflictFound = false;

    if (gears && StartTime && EndTime) {
      let realEndTime = new Date(EndTime);
      realEndTime.setHours(realEndTime.getHours() + 1);
      realEndTime = realEndTime.toISOString();

      for (let i = 0; !conflictFound && i < gears.length; i++) {
        if (!gears[i].eventStart) continue;
        for (let j = 0; !conflictFound && j < gears[i].eventStart.length; j++) {
          if (gears[i].eventStatus[j] !== "Booked ✅") continue;

          // User selected time is covering and existing session
          if (
            StartTime <= gears[i].eventStart[j] &&
            realEndTime >= gears[i].eventEnd[j]
          ) {
            conflictFound = true;
            unavailableGear = gears[i].name;
            break;
          }
          // User selected start time is during an existing session
          else if (
            StartTime >= gears[i].eventStart[j] &&
            StartTime <= gears[i].eventEnd[j]
          ) {
            conflictFound = true;
            unavailableGear = gears[i].name;
            break;
          }
          // User selected end time is during an existing session
          else if (
            realEndTime >= gears[i].eventStart[j] &&
            realEndTime <= gears[i].eventEnd[j]
          ) {
            conflictFound = true;
            unavailableGear = gears[i].name;
            break;
          }
        }
      }
    }

    if (conflictFound) {
      setGearUnavailable(true);
      setSuccessMsg(false);
    } else {
      setGearUnavailable(false);
      setSuccessMsg(true);
    }
  };

  const handleOnChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setGear({
        title: newValue,
      });
    } else {
      setGear(newValue);
      userGear = newValue;
      setGearSelected(newValue);

      // call function to check for availability
      setGearUnavailable(false);
      setSuccessMsg(false);
      if (newValue.length !== 0) availabilityCheck();
    }
  };

  return (
    <Stack spacing={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: 400 }} variant="standard">
          <Autocomplete
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            multiple
            freeSolo
            disableCloseOnSelect
            value={gear}
            onChange={handleOnChange}
            id="Search-for-course"
            options={options}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                // Value selected with enter, right from the input
                return option;
              } else return option.name; // Regular option
            }}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                  sx={{
                    "&.Mui-checked": {},
                  }}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Add Gear(s)"
                helperText="Note: All gear at the SMC (and the Level needed to checkout) can be view below"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          ></Autocomplete>
          <br />
        </FormControl>
        {iFrameGear}
        {gearUnavailable && (
          <Snackbar
            open={gearUnavailable}
            autoHideDuration={10}
            onClose={handleFakeClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="error">
              {unavailableGear} is not available at the inputted time!
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
            <Alert severity="success">
              Gear availability is good at inputted time
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Stack>
  );
}