import * as React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';

const ActionButton = styled(Button)({
  background: "linear-gradient(45deg, #555960 99%, #000000 1%)",//"linear-gradient(45deg, #4568dc 30%, #b06ab3 90%)",
  border: 0,
  borderRadius: 4,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 20px"
});

export default function FormActions({setNewEvent, setUpdateEvent, setCancelEvent, setEventID, setIDError, setGoodID, setUserSelected}) {


  const handleNewEvent = () => {
    setNewEvent(true);
    setUpdateEvent(false);
    setCancelEvent(false);
    
    // initialize ID status
    setEventID("");
    setIDError(false);
    setGoodID(false);

    // initialize form values
    setUserSelected([]);
  };

  const handleUpdateEvent = () => {
    setNewEvent(false);
    setUpdateEvent(true);
    setCancelEvent(false);

    // initialize ID status
    setEventID("");
    setIDError(false);
    setGoodID(false);
  };

  const handleCancelEvent = () => {
    setNewEvent(false);
    setUpdateEvent(false);
    setCancelEvent(true);

    // initialize ID status
    setEventID("");
    setIDError(false);
    setGoodID(false);
  };


  return (
    <Box>
    <Grid container 
    justifyContent="center"
    alignItems="center" 
    spacing={1}>

    <Grid item xs>
      <ActionButton
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={handleNewEvent}
      >
        Creat Event
      </ActionButton>
      </Grid>

      <Grid item xs>
      <ActionButton
        variant="contained"
        startIcon={<EditIcon />}
        onClick={handleUpdateEvent}
      >
        Update Event
      </ActionButton>
      </Grid>

      <Grid item xs>
      <ActionButton
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={handleCancelEvent}
      >
        Cancel Event
      </ActionButton>
      </Grid>
    </Grid>
    </Box>
  );
}
