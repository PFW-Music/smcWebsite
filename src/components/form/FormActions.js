import * as React from "react";
import { Button } from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px" // You can adjust the gap between cards if needed
};

export default function FormActions({
                                      setNewEvent,
                                      setUpdateEvent,
                                      setCancelEvent,
                                      setEventID,
                                      setIDError,
                                      setGoodID,
                                      setUserSelected
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

  return (<div style={containerStyle}>
      <Button bordered color="warning"
              onClick={handleNewEvent}
              icon={<AddCircleIcon />}
      >
        Create Event
      </Button>
      <Button bordered color="warning"
              onClick={handleUpdateEvent}
              icon={<EditIcon />}
      >
        Update Event
      </Button>
      <Button bordered color="warning"
              onClick={handleCancelEvent}
              icon={<DeleteIcon />}
      >
        Cancel Event
      </Button>

    </div>


  );
}
