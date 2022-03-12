import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar'; //test
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.REACT_APP_API_KEY}).base('appYke0X4d4wy6GUx');


function DeleteRecord(eventID) {
  base('Events').destroy(eventID, function(err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deleted', deletedRecords.length, 'records');
  });
}

function UpdateRecord(eventID) {

base('Events').update([
  {
    "id": eventID,
    "fields": {
      "Status": "Canceled ⛔️"
      }
  }
], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function(record) {
      console.log("record updated");
    });
  });
}

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" horizontal="center" {...props} />;
});

export default function EventID({IDerror, setIDError, eventID, setEventID, goodID, setGoodID, updateEvent, CancelEvent}) {

  const [successMsg, setSuccessMsg] = React.useState(false);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [openCancelSuccess, setOpenCancelSuccess] = React.useState(false);

  const handleCheckID = () => {
   
    base('Events').find(eventID, function(err, record) {
      if (err) { 
        console.error(err); 
        setIDError(true);
        setGoodID(false);
      } else {
        setIDError(false);
        setGoodID(true);
        if (updateEvent) setSuccessMsg(true);
        if (CancelEvent) setOpenCancelDialog(true);
      }
      return; 
  
    });   
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessMsg(false);
  }

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleCloseCancelSubmission = () => {
    setOpenCancelSuccess(false);
  };

  const handleSubmitCancellation = () => {
    UpdateRecord(eventID);
    //DeleteRecord(eventID); 
    setOpenCancelDialog(false);
    setOpenCancelSuccess(true);

    // initialize ID status
    setEventID("");
    setIDError(false);
    setGoodID(false);
  };

  const confirmCancelDialog = (
    <Dialog
    open={openCancelDialog}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseCancelDialog}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Are you sure to cancel this booking?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Once a booking is cancelled, record will be deleted from the database. 
        Click "Yes" to proceed the cancellation.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmitCancellation}>Yes</Button>
      <Button onClick={handleCloseCancelDialog}>No</Button>
    </DialogActions>
  </Dialog>
  );

  const succesCancellation = (
    <Modal
      open={openCancelSuccess}
      onClose={handleCloseCancelSubmission}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cancellation Successful!
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please check your inbox for the confirmation.
        </Typography>
      </Box>

    </Modal>
  ); 

  return (
    <Box m= "auto" sx={{ display: "flex", alignItems: "center"}} >
    <Grid container spacing={1}>
      <Grid item>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: 300 }
          }}
          noValidate
          autoComplete="off"
        >
          {IDerror && (
            <TextField
              error
              label="Error"
              helperText="ID does not exist in the system :("
              value={eventID}
              size="small"
              onChange={(event) => {
                setEventID(event.target.value);
                console.log(event.target.value);
              }}
            />
          )}
          {!IDerror && (
            <TextField
              label="Event Record ID"
              value={eventID}
              size="small"
              onChange={(event) => {
                setEventID(event.target.value);
                console.log(event.target.value);
              }}
            />
          )}
        </Box>
      </Grid>
      <Grid item alignItems="stretch" style={{ display: "flex" }}>
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "left" }}
        >
          <Button variant="contained" disabled={!eventID} onClick={handleCheckID}>
            confirm
          </Button>
          {successMsg && 
            <Snackbar open={successMsg} autoHideDuration={2000} onClose={handleCloseMessage} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert severity="success">Your booking record was found! Please re-fill up this form to update us about your booking :)</Alert>
            </Snackbar>
          }
          {confirmCancelDialog}
          {succesCancellation}
        </Box>
      </Grid>
    </Grid>
    </Box>
  );
}
