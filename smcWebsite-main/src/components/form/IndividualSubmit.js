import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';  
import NameInput from './NameInput'; 
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { styled } from "@mui/styles";

var eventID;
var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base('appYke0X4d4wy6GUx');



const SubmitButton = styled(Button)({
  background: "linear-gradient(45deg, #555960 99%, #000000 1%)",//"linear-gradient(45deg, #ffd06a 30%, #fded2d 90%)",
  border: 0,
  borderRadius: 4,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});


//create global variables here

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: '#e7dcc8',
  outline:0, 
  boxShadow: 20,
  p: 4,
  color: '#191b1d',
};

function CreateEventRecord(users,
                           startTimeSelected,
                           endTimeSelected,
                           gears) {

  base('Events').create([
    {
      "fields": {
        "Event Name": "Individual Gear Check Out",
        "Start Time": startTimeSelected,
        "Proposed End Time": endTimeSelected,
        "Students": users,
        "Status": "Booked ✅",
        "Gear Selection" : gears,
      }
    }
  ], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
        console.log("event table updated");
        return record.getId();
    });
  });

}

function CreateGearUseLogRecord(users,
                                gears,
                                eventID) {
    base('Gear Use Log').create([
        {
            "fields": {
            "Person": users,
            "Gear": gears,
            "Event": eventID
            }
        }
        ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
        records.forEach(function (record) {
            console.log("gear uas log updated");
        });
        });
}



export default function Submit({userSelected, 
                                startTimeSelected, 
                                endTimeSelected,
                                gearSelected, 
                                timeCorrect
                                }) {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleSubmit = () => {
    setOpen(true);

    // getting the IDs lists for linking fields
    var users = [];
    var gears = [];

    if (userSelected) {
      userSelected.forEach(function(obj){
          users.push(obj.id);
      })
    }
    if (gearSelected) {
      gearSelected.forEach(function(obj){
        gears.push(obj.id);
      })
    }

    // create record
    CreateEventRecord(users,
                      startTimeSelected,
                      endTimeSelected,
                      gears);
    console.log("checking error");

  };

  const handleClose = () => {

    // slose the confirmation page
    setOpen(false); 
    window.location.reload();
  }


  return (
    <div>
      <SubmitButton 
      variant="contained" 
      disabled={!(endTimeSelected && startTimeSelected && timeCorrect) || gearSelected.length === 0 || userSelected.length === 0}
      onClick={handleSubmit}>
        SUBMIT
      </SubmitButton>   

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