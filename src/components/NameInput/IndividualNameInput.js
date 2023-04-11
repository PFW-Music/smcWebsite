import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
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

const filter = createFilterOptions();

function IndividualNameInput({
  peopleAllInfo,
  userSelected,
  setUserSelected,
  setGearList,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(null);

  const [nameInDisplay, setNameInDisplay] = useState([]);

  const handleRemoveName = (item) => {
    setNameInDisplay((prev) => [...prev.filter((i) => i !== item)]);
    setUserSelected((prev) => prev.filter((user) => user.name !== item));
    setGearList(filterGear());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason, isReset = true) => {
    if (reason === "ok" || reason === "cancel") {
      setOpen(false);
      if (isReset) {
        setValue(null);
      }
      setError(false);
    }
  };

  const handleChange = (event, newValue) => {
    if (newValue != null) {
      if (userSelected.some((user) => user.name === newValue.name)) {
        setError(true);
      } else {
        setError(false);

        setUserSelected((prev) => [...prev, newValue]);
        setNameInDisplay((prev) => [...prev, newValue.name]);
        setGearList(filterGear());

        setValue(null);
        handleClose(null, null, false);
      }
    }
  };

  const filterGear = useCallback(() => {
    let lendLevel = "";
    let gearList = [];

    if (userSelected.some((element) => element.gearAccess === "Gear Level 4")) {
      lendLevel = "Lending Level 4";
    } else if (
      userSelected.some((element) => element.gearAccess === "Gear Level 3")
    ) {
      lendLevel = "Lending Level 3";
    } else if (
      userSelected.some((element) => element.gearAccess === "Gear Level 2")
    ) {
      lendLevel = "Lending Level 2";
    } else if (
      userSelected.some((element) => element.gearAccess === "Gear Level 1")
    ) {
      lendLevel = "Lending Level 1";
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
  }, [userSelected]);

  useEffect(() => {
    setGearList(filterGear());
  }, [filterGear, setGearList]);

  const nameInputDialog = (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Find your name</DialogTitle>
      <DialogContent>
        <Stack spacing={0} sx={{ width: 480 }}>
          <Autocomplete
            value={value}
            onChange={handleChange}
            filterOptions={(options, params) => {
              return filter(options, params);
            }}
            selectOnFocus
            handleHomeEndKeys
            id="Search-for-name"
            options={peopleAllInfo}
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              } else return option.name;
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
                  {error ? (
                    <TextField
                      {...params}
                      error
                      id="error"
                      label="Error"
                      helperText="This user has already been added"
                      size="small"
                      variant="standard"
                    />
                  ) : (
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
        <Button
          bordered
          color="warning"
          auto
          onClick={(event) => handleClose(event, "ok")}
        >
          Ok
        </Button>
        <Button
          bordered
          color="warning"
          auto
          onClick={(event) => handleClose(event, "cancel")}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div>
      <Box sx={{ textAlign: "left", m: 2 }}>
        <Button bordered color="warning" auto onClick={handleClickOpen}>
          +ADD
        </Button>
      </Box>
      {nameInputDialog}
      {nameInDisplay.length !== 0 && (
        <Paper variant="outlined" sx={{ mt: 2, boxShadow: 1 }}>
          <Paper />
          <List>
            {nameInDisplay.map((item) => (
              <React.Fragment key={item}>
                {nameInDisplay.indexOf(item) !== 0 && <Divider />}
                <ListItem
                  secondaryAction={
                    <Button
                      bordered
                      color="warning"
                      auto
                      onClick={() => handleRemoveName(item)}
                      icon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  }
                >
                  <ListItemText primary={item} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
}

export default IndividualNameInput;
