import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Fade from "@mui/material/Fade";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

// This will be used to store input data
var userEventTitle;
var userEventType;
var userEventUsage;
var userFacultyInput;

const eventTypes = [
  "Summer Booking 🏖",
  "Recording Session 🎙",
  "Student Project 🎬",
  "Class 📚",
  "Meeting 🤝",
  "Rehearsal 💪",
  "Audition 👨‍⚖️"
];

const eventUsages = ["Personal Use 👤", "Academic 🎓", "Sweetwater 🤝"];

function getStyles(type, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export default function EventDetailsInput({facultyList, 
                                           setSessionTitle, 
                                           setEventTypeSelected, 
                                           setFacultySelected, 
                                           setUsageSelected}) {

  const theme = useTheme();
  const [eventType, setEventType] = React.useState([]);
  const [eventUsage, setEventUsage] = React.useState([]);
  const [title, setTitle] = React.useState([]);
  const [isProject, setIsProject] = React.useState(false);
  const [faculty, setFaculty] = React.useState([]);

  const handleChangeType = (event) => {
    const {
      target: { value }
    } = event;
    setEventType(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    userEventType = value;
    setEventTypeSelected(value);
    console.log(userEventType);
    if (userEventType === "Student Project 🎬") setIsProject(true);
    else setIsProject(false);
  };

  const handleChangeUsage = (event) => {
    const {
      target: { value }
    } = event;
    setEventUsage(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    userEventUsage = value;
    setUsageSelected(value);
    console.log(userEventUsage);
  };

  const FacultySelection = (
    <FormControl sx={{ m: 1, width: 400 }} variant="standard">
      <Autocomplete
        multiple
        freeSolo
        disableCloseOnSelect
        value={faculty}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setFaculty({
              title: newValue
            });
          } else {
            setFaculty(newValue);
            userFacultyInput = newValue;
            setFacultySelected(newValue);
            console.log(userFacultyInput);
          }
        }}
        id="Search-for-faculty"
        options={facultyList}
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
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Find your professor" />
        )}
      ></Autocomplete>
    </FormControl>
  );


  return (
    <div>
      <Stack spacing={1}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 400 }
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-name"
            label="Session Title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              userEventTitle = event.target.value;
              setSessionTitle(event.target.value);
              console.log(userEventTitle);
            }}
          />
        </Box>
        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-chip-label">
              Event Type
            </InputLabel>
            <Select
              labelId="event-multiple-selection"
              id="event-multiple-chip"
              value={eventType}
              onChange={handleChangeType}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Find an option"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {eventTypes.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  style={getStyles(type, eventType, theme)}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
        {isProject &&<Fade in={isProject}>{FacultySelection}</Fade>}
        </div>

        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-chip-label">
              Intended Use
            </InputLabel>
            <Select
              labelId="event-multiple-selection"
              id="event-multiple-chip"
              value={eventUsage}
              onChange={handleChangeUsage}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Find an option"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {eventUsages.map((usage) => (
                <MenuItem
                  key={usage}
                  value={usage}
                  style={getStyles(usage, eventUsage, theme)}
                >
                  {usage}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Stack>
    </div>
  );
}
