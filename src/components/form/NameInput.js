
import React, { useEffect, useCallback } from "react";
import { Button } from "@nextui-org/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID);

let userValues = [];

const emojis = [
  "🎹",
  "😃",
  "😀",
  "😊",
  "📯",
  "🪕",
  "🎵",
  "🎺",
  "🥁",
  "🎻",
  "🎷",
  "😂",
  "🎸",
  "😋",
  "😎",
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
          size="large"
          className="text-gray-500"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={emoji + " " + item} />
    </ListItem>
  );
}

let gearList = [];
let lendLevel = "";

function filterGear() {
  if (userValues.some((element) => element.gearAccess === "Gear Level 4")) {
    lendLevel = "Lending Level 4";
  } else if (
    userValues.some((element) => element.gearAccess === "Gear Level 3")
  ) {
    lendLevel = "Lending Level 3";
  } else if (
    userValues.some((element) => element.gearAccess === "Gear Level 2")
  ) {
    lendLevel = "Lending Level 2";
  } else if (
    userValues.some((element) => element.gearAccess === "Gear Level 1")
  ) {
    lendLevel = "Lending Level 1";
  } else {
    return gearList;
  }

  base("Gear")
    .select({
      view: lendLevel,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function (record) {
          gearList.push({
            name: record.get("Item"),
            id: record.id,
            eventStart: record.get("Events Start"),
            eventEnd: record.get("Events End"),
            eventStatus: record.get("Events Status"),
          });
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
        }
      }
    );

  return gearList;
}

let roomTypes;

function filterRoomType(disabled) {
  if (userValues.some((element) => element.roomAccess === "Room Access 3")) {
    disabled = [];
  } else if (
    userValues.some((element) => element.roomAccess === "Room Access 2")
  ) {
    disabled = ["Recording Studio 🎙️"];
  } else if (
    userValues.some((element) => element.roomAccess === "Room Access 1")
  ) {
    disabled = ["Recording Studio 🎙️", "Rehearsal Spaces 🎧"];
  } else {
    disabled = [
      "Recording Studio 🎙️",
      "Rehearsal Spaces 🎧",
      "Edit & Collaboration Spaces 🎒",
    ];
  }
  return disabled;
}

const filter = createFilterOptions();

function NameInput({
  peopleAllInfo,
  setUserSelected,
  setUserCount,
  setDisabledRoomTypes,
  setGearList,
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [passFail, setPassFail] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [phoneVal, setPhoneVal] = React.useState(null);

  const [nameInDisplay, setNameInDisplay] = React.useState(
    userNameList.slice(0, 3)
  );

  const Initilize = useCallback(() => {
    userValues = [];
    gearList = [];
    roomTypes = [
      "Recording Studio 🎙️",
      "Rehearsal Spaces 🎧",
      "Edit & Collaboration Spaces 🎒",
    ];
    setGearList(filterGear());
    setDisabledRoomTypes(filterRoomType(roomTypes));
  }, [setDisabledRoomTypes, setGearList]);

  useEffect(() => {
    Initilize();
  }, [Initilize]);
  const handleAddName = () => {
    setNameInDisplay(userNameList);
  };

  const handleRemoveName = (item) => {
    setNameInDisplay((prev) => [...prev.filter((i) => i !== item)]);
    userNameList.splice(userNameList.indexOf(item), 1);
    userValues = userValues.filter((user) => user.name !== item);

    setUserCount(userNameList.length);
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
      setPhoneVal(null);
      setError(false);
    }
  };

  const handleName = (event, newValue) => {
    if (newValue == null) {
      setValue(null);
      return;
    }
    if (typeof newValue === "string") {
      setValue({
        title: newValue,
      });
    } else {
      setValue(newValue);
    }
  };

  const handleChange = (newValue) => {
    if (!value) {
      return;
    }
    if (nameCheck(newValue, value.name, phoneVal)) {
      if (newValue != null) {
        if (userNameList.indexOf(newValue.name) > -1) {
          setError(true);
        } else {
          setError(false);
          setPassFail(false);
          handleClose();
          userValues.push(newValue);
          userNameList.push(newValue.name);

          setUserCount(userNameList.length);
          setUserSelected(userValues);
          setDisabledRoomTypes(filterRoomType(roomTypes));
          setGearList(filterGear());

          handleAddName();
        }
      }
    } else {
      setPassFail(true);
    }
  };

  const nameCheck = (recordVal, name, number) => {
    const phonePass = recordVal.phoneNum.slice(-4);
    return recordVal.name === name && phonePass === number;
  };

  const handleOk = () => {
    handleChange(value);
  };
  const nameInputDialog = (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Find your name</DialogTitle>
      <DialogContent>
        <div className="w-full space-y-4">
          <Autocomplete
            value={value}
            onChange={handleName}
            filterOptions={(options, params) => {
              return filter(options, params);
            }}
            selectOnFocus
            clearOnBlur={true}
            handleHomeEndKeys
            id="Search-for-name"
            options={peopleAllInfo}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              } else return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            className="w-full"
            freeSolo
            renderInput={(params) => (
              <div>
                <div className="flex items-center">
                  <SearchRoundedIcon className="text-gray-500 mr-2 my-2" />
                  {error && (
                    <TextField
                      {...params}
                      error
                      id="error"
                      label="Error"
                      helperText="This user has already been added"
                      size="small"
                      variant="standard"
                      value={params.inputProps.value || ""}
                      className="w-full"
                    />
                  )}
                  {!error && (
                    <TextField
                      {...params}
                      label="Search for name"
                      helperText="Please enter your name here :)"
                      size="small"
                      variant="standard"
                      value={params.inputProps.value || ""}
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            )}
          />
          <div>
            <div className="flex items-center">
              {passFail && (
                <TextField
                  passFail
                  id="passwordFailure"
                  label="Please enter correct password"
                  helperText="User+Password combo failed."
                  onChange={(e) => setPhoneVal(e.target.value)}
                  value={phoneVal || ""}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleChange(value);
                    }
                  }}
                  size="small"
                  variant="standard"
                  inputProps={{ maxLength: 4, minLength: 4 }}
                  InputLabelProps={{ required: false }}
                  className="w-1/2 ml-auto mr-8"
                />
              )}
              {!passFail && (
                <TextField
                  required
                  id="phone-val"
                  label="Last 4 of Ph#"
                  onChange={(e) => setPhoneVal(e.target.value)}
                  value={phoneVal || ""}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleChange(value);
                    }
                  }}
                  variant="standard"
                  size="small"
                  inputProps={{ maxLength: 4, minLength: 4 }}
                  InputLabelProps={{ required: false }}
                  className="w-1/2 ml-auto mr-8"
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button bordered color="warning" auto onClick={handleOk}>
          Ok
        </Button>
        <Button bordered color="warning" auto onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <div className="text-left m-2">
        <Button bordered color="warning" auto onClick={handleClickOpen}>
          +ADD
        </Button>
      </div>
      {nameInputDialog}
      {userNameList.length !== 0 && (
        <Paper
          variant="outlined"
          className="mt-2 shadow-md"
        >
          <Paper />
          <List>
            <List>
              {nameInDisplay.map((item, index) => (
                <React.Fragment key={item}>
                  {index !== 0 && <Divider />}
                  <Collapse in={true} key={item}>
                    {renderItem({ item, handleRemoveName })}
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </List>
        </Paper>
      )}
    </div>
  );
}

export default NameInput;
