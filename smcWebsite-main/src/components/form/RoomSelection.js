import * as React from "react";
import { useEffect } from 'react'; //test
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { pink } from "@mui/material/colors";
import _without from "lodash/without";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";


///////////////////   API Magic   ////////////////////////////////
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base('appYke0X4d4wy6GUx');


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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  inputLabel: {
    color: "gray",
    "&.Mui-focused": {
      color: pink[800]
    }
  },
  inputFocused: {},
  select: {
    color: "black",
    "&:before": {
      // changes the bottom textbox border when not focused
      borderColor: "gray"
    },
    "&:after": {
      // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
      borderColor: pink[800]
    }
  },
  outlinedInput: {
    color: "gray",
    "&:after": {
      borderColor: pink[800]
    }
  }
}));

// This will be used to store input data
var userRoomType;
var userRoomSelection;
//const roomTypes = [];
//var disabledRoomTypes;

const roomTypes = [
   "Recording Studio 🎙️",
   "Rehearsal Spaces 🎧",
   "Edit & Collaboration Spaces 🎒"
];

function getStyles(type, eventType, theme) {
  return {
    fontWeight:
      eventType.indexOf(type) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

// Variables to used for API filtering
var roomOptionsAllInfo=[];
var roomSelectedAllInfo=[];
var eventsList = [];
var unavailableTimes = [];

export default function RoomSelectionInput({roomOptionStudio, 
                                            roomOptionRehearsal, 
                                            roomOptionECspace, 
                                            disabledRoomTypes, 
                                            setRoomTypeSelected,
                                            setRoomSelected,
                                            roomBookingRecord,
                                            setRoomBookingRecord
                                            }) {
  const classes = useStyles();
  const theme = useTheme();
  const [roomType, setRoomType] = React.useState([]);
  const [room, setRoom] = React.useState([]);

  const [isStudio, setIsStudio] = React.useState(false);
  const [isRehearsal, setIsRehearsal] = React.useState(false);
  const [isECspace, setIsECspace] = React.useState(false);

  const handleChangeRoomType = (event) => {
    const {
      target: { value }
    } = event;
    setRoomType(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    userRoomType = value;
    setRoomTypeSelected(value);
    console.log(userRoomType);

    if (userRoomType === "Recording Studio 🎙️") {
      roomOptionsAllInfo = roomOptionStudio;
      setIsStudio(true);
      setIsRehearsal(false);
      setIsECspace(false);
      setRoom([]); // Clear user input
      console.log(roomOptionsAllInfo);
    } else if (userRoomType === "Rehearsal Spaces 🎧") {
      roomOptionsAllInfo = roomOptionRehearsal;
      setIsStudio(false);
      setIsRehearsal(true);
      setIsECspace(false);
      setRoom([]); // Clear user input
      console.log(roomOptionsAllInfo);
    } else if (userRoomType === "Edit & Collaboration Spaces 🎒") {
      roomOptionsAllInfo = roomOptionECspace;
      setIsStudio(false);
      setIsRehearsal(false);
      setIsECspace(true);
      setRoom([]); // Clear user input
    }
  };

  const handleChangeRoom = (event) => {
    const {
      target: { value }
    } = event;
    setRoom(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    userRoomSelection = value;
    setRoomSelected(value);
    //console.log(value);
    //console.log(roomOptionsAllInfo);
    
    //GENERATING ARRAY WITH ALL INFO ON ROOM SELECTED
    var valueLength = value.length;
    var roomOptionsLength = roomOptionsAllInfo.length;
    roomSelectedAllInfo = [];

    for (var i = 0; i < valueLength; i++) 
    {
      for (var x = 0; x < roomOptionsLength; x++)
      {
        if(roomOptionsAllInfo[x].name === value[i])
          roomSelectedAllInfo.push(roomOptionsAllInfo[x]);
      }
    }
    console.log("filtered array",roomSelectedAllInfo);

    ///////////////////   API Magic   ////////////////////////////////

    //Crawling all rooms to find associated events whose recordIDs are stored in eventsList[]
    var roomSelectedAllInfoLength = roomSelectedAllInfo.length;
    eventsList = [];
    var eventsListLength = 0;
    for (var j = 0; j < roomSelectedAllInfoLength; j++){
      
      base('Rooms').find(roomSelectedAllInfo[j].key, function(err, record) {
    
        if (err) { console.error(err); return; }
        //console.log('Retrieved', record);
        eventsList.push({
          name: record.get('Name'), 
          id: record.id,
          eventStart: record.get('Events Start'),
          eventEnd: record.get('Events End'),
          eventStatus: record.get('Events Status')
        });
        eventsListLength++;
        
        
      });      
    }
    setRoomBookingRecord(eventsList)
    console.log("Events:",eventsList);
    

    //Please ignore this battlefield. But honor the fallen.

    // //Crawling all events to find associated times which are stored in unavailableTimes[]
    // unavailableTimes = [];
    
    // console.log(j);
    // console.log(eventsList);
    
    
    // console.log("Here");
    // console.log(JSON.stringify(eventsList[0]))

    // for(const element in eventsList){
    //   console.log(typeof(element));
    //   console.log(element);
    // }


    //eventsList.forEach(element => console.log(element));


    // eventsList.forEach(function (element) {
    //   console.log(element);
    // });


    // for (var k = 0; k < eventsListLength; k++){
      
    //   base('Events').find(eventsListLength[k].key, function(err, record) {
    //     if (err) { console.error(err); return; }
    //   console.log('Retrieved event rec', record);

    // });

    // }
    

  };

  

  useEffect(() => { 
    //console.log("roomBookingRecord:", roomBookingRecord);
    if (roomBookingRecord.length !== 0) {
      console.log("one room records", roomBookingRecord[0].eventStart[0], roomBookingRecord[0].eventEnd[0], roomBookingRecord[0].eventStatus[0] );
      //var test = roomBookingRecord[0].events[0];
      //console.log("test",test)
    }
  }, [roomBookingRecord]);


  const handleDelete = (e, value) => {
    e.preventDefault();
    setRoom((current) => _without(current, value));
    setRoomSelected((current) => _without(current, value));
  };

  const roomSelectionStudio = (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel className={classes.inputLabel}>
        Select studio room(s)
      </InputLabel>
      <Select
        labelId="event-multiple-selection"
        id="event-multiple-chip"
        value={room}
        onChange={handleChangeRoom}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select studio room(s)"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roomOptionStudio.map((option) => (
          <MenuItem
            key={option.key}
            value={option.name}
            style={getStyles(option.name, room, theme)}
          >
            <Checkbox
              checked={room.indexOf(option.name) > -1} 
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const roomSelectionRehearsal = (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel id="demo-multiple-chip-label">
        Select rehearsal room(s)
      </InputLabel>
      <Select
        labelId="event-multiple-selection"
        id="event-multiple-chip"
        value={room}
        onChange={handleChangeRoom}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select rehearsal room(s)"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roomOptionRehearsal.map((option) => (
          <MenuItem
            key={option.key}
            value={option.name}
            style={getStyles(option.name, room, theme)}
          >
            <Checkbox
              checked={room.indexOf(option.name) > -1} 
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const roomSelectionECspace = (
    <FormControl sx={{ m: 1, width: 400 }}>
      <InputLabel id="demo-multiple-chip-label">
        Select Edit & Collaboration room(s)
      </InputLabel>
      <Select
        labelId="event-multiple-selection"
        id="event-multiple-chip"
        value={room}
        onChange={handleChangeRoom}
        multiple
        input={
          <OutlinedInput
            id="select-multiple-chip"
            label="Select Edit & Collaboration room(s)"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={(e) => handleDelete(e, value)}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roomOptionECspace.map((option) => (
          <MenuItem
            key={option.key}
            value={option.name}
            style={getStyles(option.name, room, theme)}
          >
            <Checkbox
              checked={room.indexOf(option.name) > -1} 
              sx={{
                color: pink[800],
                "&.Mui-checked": {
                  color: pink[600]
                }
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <div>
      <Stack spacing={1}>
        <div>
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel className={classes.inputLabel}>Room Type</InputLabel>
            <Select
              className={classes.select}
              value={roomType}
              onChange={handleChangeRoomType}
              input={
                <OutlinedInput
                  className={classes.outlinedInput}
                  label="Room Type"
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
              {roomTypes.map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  style={getStyles(type, roomType, theme)}
                  disabled={disabledRoomTypes.indexOf(type) > -1}
                >
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          {isStudio && <Fade in={isStudio}>{roomSelectionStudio}</Fade>}
          {isRehearsal && <Fade in={isRehearsal}>{roomSelectionRehearsal}</Fade>}
          {isECspace && <Fade in={isECspace}>{roomSelectionECspace}</Fade>}
        </div>
      </Stack>
    </div>
  );
}
