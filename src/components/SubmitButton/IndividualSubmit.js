import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import base from "../airtable";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#16181A",
  outline: 0,
  boxShadow: 20,
  p: 4,
  color: "#191b1d",
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
};

async function createEventRecord(
  users,
  startTimeSelected,
  endTimeSelected,
  gears
) {
  try {
    const records = await base("Events").create([
      {
        fields: {
          "Event Name": "Individual Gear Check Out",
          "Start Time": startTimeSelected,
          "Proposed End Time": endTimeSelected,
          Students: users,
          Status: "Booked ✅",
          "Gear Selection": gears,
        },
      },
    ]);

    records.forEach(function (record) {
      return record.getId();
    });
  } catch (err) {
    console.error(err);
  }
}

export default function Submit({
  userSelected,
  startTimeSelected,
  endTimeSelected,
  gearSelected,
  timeCorrect,
}) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async () => {
    setOpen(true);

    const users = userSelected.map((obj) => obj.id);
    const gears = gearSelected.map((obj) => obj.id);

    await createEventRecord(users, startTimeSelected, endTimeSelected, gears);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  return (
    <div style={containerStyle}>
      <Button
        variant="outlined"
        color="warning"
        onClick={handleSubmit}
        disabled={
          !(endTimeSelected && startTimeSelected && timeCorrect) ||
          gearSelected.length === 0 ||
          userSelected.length === 0
        }
      >
        SUBMIT
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submission Successful!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please check your inbox for booking confirmation.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
