import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stack from "@mui/material/Stack";

function FormActions({
                       setNewEvent,
                       setUpdateEvent,
                       setCancelEvent,
                       setEventID,
                       setIDError,
                       setGoodID,
                       setUserSelected,
                     }) {
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

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkIsSmallScreen = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 600px)").matches);
    };

    checkIsSmallScreen();
    window.addEventListener("resize", checkIsSmallScreen);

    return () => {
      window.removeEventListener("resize", checkIsSmallScreen);
    };
  }, []);

  return (
    <Stack
      display="flex"
      direction={isSmallScreen ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ p: 2 }}
    >
      <Button
        bordered
        color="warning"
        onClick={handleNewEvent}
        icon={<AddCircleIcon />}
      >
        Create Event
      </Button>
      <Button
        bordered
        color="warning"
        onClick={handleUpdateEvent}
        icon={<EditIcon />}
      >
        Update Event
      </Button>
      <Button
        bordered
        color="warning"
        onClick={handleCancelEvent}
        icon={<DeleteIcon />}
      >
        Cancel Event
      </Button>
    </Stack>
  );
}

export default FormActions;