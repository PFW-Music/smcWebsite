import * as React from "react";
import Box from "@mui/material/Box";
import { Button } from "@nextui-org/react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/styles";

const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.REACT_APP_API_KEY }).base(
  process.env.REACT_APP_AIRTABLE_BASE_ID
);

//create global variables here

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#16181A",
  outline: 0,
  boxShadow: 20,
  p: 4,
  color: "#191b1d"
};

async function CreateEventRecord(
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
          "Gear Selection": gears
        }
      }
    ]);

    records.forEach(function(record) {
      console.log("event table updated");
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
                                 timeCorrect
                               }) {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = async () => {
    setOpen(true);

    // getting the IDs lists for linking fields
    const users = [];
    const gears = [];

    if (userSelected) {
      userSelected.forEach(function(obj) {
        users.push(obj.id);
      });
    }
    if (gearSelected) {
      gearSelected.forEach(function(obj) {
        gears.push(obj.id);
      });
    }

    // create record
    await CreateEventRecord(users, startTimeSelected, endTimeSelected, gears);
    console.log("checking error");
  };
  const handleClose = () => {
    // slose the confirmation page
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Button bordered color="warning" auto
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
        <Box sx={style}>
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
