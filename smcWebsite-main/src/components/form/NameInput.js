import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import FormLabel from "@mui/material/FormLabel";


var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base('appYke0X4d4wy6GUx');

// This will be used to store input data
var userValues = [];

var emojis = [
  "🎹",
  "😃",
  "😀",
  "😊",
  "😉",
  "😍",
  "😘",
  "📯",
  "🪕",
  "😙",
  "😜",
  "😝",
  "😛",
  "🎵",
  "🎺",
  "🥁",
  "🎻",
  "🎷",
  "😂",
  "🎸",
  "😪",
  "😋",
  "😷",
  "😎",
  "😴",
  "😵",
  "😲",
  "😈"
];

const userEmoji = [];
const userNameList = [];


function renderItem({ item, handleRemoveName }) {
  const emoji = userEmoji[userNameList.indexOf(item)];

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveName(item)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={emoji + " " + item} />
    </ListItem>
  );
}

var gearList = [];    //store list of gear available to user
var lendLevel = "";      //store determined lending level

////////////////////// Filtering gears accessible using API data
function filterGear(){
  
  
  if (userValues.some(element => element.gearAccess === 'Gear Level 4')) {
    lendLevel = "Lending Level 4"; 
  }

  else if (userValues.some(element => element.gearAccess === 'Gear Level 3')){
    lendLevel = "Lending Level 3";
  }
  else if (userValues.some(element => element.gearAccess === 'Gear Level 2')){
    lendLevel = "Lending Level 2";
  }
  else if (userValues.some(element => element.gearAccess === 'Gear Level 1')){
    lendLevel = "Lending Level 1";
  }
  //CASE: User has no lendLevel (staff) RETURN: Empty gearList for selection options
  else{ 
    
    return gearList;
  }

  //API call to appropriate view on Airtable. View called depends on "lendLevel" determined above. 

    base('Gear').select({
      view: lendLevel
    }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
          //console.log('Retrieved', record.get('Item'), record);
          gearList.push({
            name: record.get('Item'), 
            id: record.id, 
            eventStart: record.get('Events Start'),
            eventEnd: record.get('Events End'),
            eventStatus: record.get('Events Status')
          })
      });
  
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });

  return gearList;
  
}


var roomTypes;

////////////////////// Filtering gears using API data
function filterRoomType(disabled) {
  
  if (userValues.some(element => element.roomAccess === 'Room Access 3')) {
    disabled = [];
  }
  else if (userValues.some(element => element.roomAccess === 'Room Access 2')){
    disabled = ["Recording Studio 🎙️"];
  }
  else if (userValues.some(element => element.roomAccess === 'Room Access 1')){
    disabled = [
      "Recording Studio 🎙️",
      "Rehearsal Spaces 🎧"
    ];
  }
  else{
    // roomTypes[] remains empty as the user has no access levels
    disabled = [
      "Recording Studio 🎙️",
      "Rehearsal Spaces 🎧",
      "Edit & Collaboration Spaces 🎒"
   ];
  }
  return disabled;
}


const filter = createFilterOptions();

function NameInput({peopleAllInfo, userSelected, setUserSelected, setUserCount, setDisabledRoomTypes, setGearList}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const [nameInDisplay, setNameInDisplay] = React.useState(
    userNameList.slice(0, 3)
  );

  const Initilize = () => {
    if (!userSelected) userNameList = [];
  }

  const handleAddName = () => {
    setNameInDisplay(userNameList);
  };

  const handleRemoveName = (item) => {
    console.log(item);
    setNameInDisplay((prev) => [...prev.filter((i) => i !== item)]);
    userNameList.splice(userNameList.indexOf(item), 1);
    userValues = userValues.filter((user) => user.name !== item);

    setUserCount(userNameList.length); // send data to home
    setUserSelected(userValues);
    setDisabledRoomTypes(filterRoomType(roomTypes));
    setGearList(filterGear());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      setValue(null);
      setError(false);
    }
  };

  const handleChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setValue({
        title: newValue
      });
    } else {
      setValue(newValue);
    }
    if (newValue != null) {
      if (userNameList.indexOf(newValue.name) > -1) {
        console.log(userNameList.indexOf(newValue));
        setError(true);
      } else {
        setError(false);
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        userEmoji.push(randomEmoji);
        handleClose();
        userValues.push(newValue);
        userNameList.push(newValue.name);

        setUserCount(userNameList.length); // send data to home 
        setUserSelected(userValues);
        setDisabledRoomTypes(filterRoomType(roomTypes));
        setGearList(filterGear());

        handleAddName();
      }
  }
  };

  const nameInputDialog = (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Find your name</DialogTitle>
      <DialogContent>
        <Stack spacing={0} sx={{ width: 480 }}>
          <Autocomplete
            value={value}
            onChange={handleChange}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return filtered;
            }}
            selectOnFocus
            clearOnBlur={true}
            handleHomeEndKeys
            id="Search-for-name"
            options={peopleAllInfo}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                // Value selected with enter, right from the input
                return option;
              } else return option.name; // Regular option
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            sx={{ width: 450 }}
            freeSolo
            renderInput={(params) => (
              <div>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <SearchRoundedIcon
                    sx={{ color: "action.active", mr: 1, my: 3.5 }}
                  />
                  {error && (
                    <TextField
                      {...params}
                      error
                      id="error"
                      label="Error"
                      helperText="This user has already been added"
                      size="small"
                      variant="standard"
                    />
                  )}
                  {!error && (
                    <TextField
                      {...params}
                      label="Search for name"
                      helperText="Please enter your name here :)"
                      size="small"
                      variant="standard"
                    />
                  )}
                </Box>
              </div>
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      {Initilize}
      <Box sx={{textAlign: "left", m: 2}}>
        <Button variant="contained" onClick={handleClickOpen}>
          +ADD
        </Button>
      </Box>
      {nameInputDialog}
      {userNameList.length !== 0 && (
        <Paper variant="outlined" sx={{ mt: 2, boxShadow: 1 }}>
          <Paper  />
          <List>
            <TransitionGroup>
              {nameInDisplay.map((item) => (
                <Collapse key={item}>
                  {(userNameList.indexOf(item) !== 0) && <Divider />}
                  {renderItem({ item, handleRemoveName })}
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Paper>
      )}
    </div>
  );
}

export default NameInput;

