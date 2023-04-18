import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@nextui-org/react";
import Grid from "@mui/material/Grid";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import base from "./airtable";

function UpdateRecord(eventID) {
	base("Events").update(
		[
			{
				id: eventID,
				fields: {
					Status: "Canceled ⛔️",
				},
			},
		],
		function (err, records) {
			if (err) {
				console.error(err);
				return;
			}
			records.forEach(function () {});
		}
	);
}

const style = {
	position: "absolute",
	top: "40%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#16181A",
	outline: 0,
	boxShadow: 20,
	color: "#191b1d",
};

const Alert = React.forwardRef(function Alert(props, ref) {
	return (
		<MuiAlert
			elevation={6}
			ref={ref}
			variant="filled"
			horizontal="center"
			{...props}
		/>
	);
});

export default function EventID({
	IDerror,
	setIDError,
	eventID,
	setEventID,
	setGoodID,
	updateEvent,
	CancelEvent,
}) {
	const [successMsg, setSuccessMsg] = React.useState(false);
	const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
	const [openCancelSuccess, setOpenCancelSuccess] = React.useState(false);

	const handleCheckID = () => {
		base("Events").find(eventID, function (err) {
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
		});
	};

	const handleCloseMessage = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSuccessMsg(false);
	};

	const handleCloseCancelDialog = () => {
		setOpenCancelDialog(false);
	};

	const handleCloseCancelSubmission = () => {
		setOpenCancelSuccess(false);
	};

	const handleSubmitCancellation = () => {
		UpdateRecord(eventID);
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
			keepMounted
			onClose={handleCloseCancelDialog}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>{"Are you sure to cancel this event?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Once an event is cancelled, the action cannot be undone. Click Yes to
					proceed the cancellation.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					bordered
					color="primary"
					auto
					onClick={handleSubmitCancellation}
				>
					Yes
				</Button>
				<Button bordered color="primary" auto onClick={handleCloseCancelDialog}>
					No
				</Button>
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
		<Box m="auto" sx={{ display: "flex", alignItems: "center" }}>
			<Grid container spacing={1}>
				<Grid item>
					<Box
						component="form"
						sx={{
							"& > :not(style)": { width: 300 },
						}}
						noValidate
						autoComplete="off"
					>
						{IDerror && (
							<TextField
								variant="standard"
								error
								label="Error"
								helperText="ID does not exist in the system :("
								value={eventID}
								size="small"
								onChange={(event) => {
									setEventID(event.target.value);
								}}
								fullWidth
								sx={{
									"& label": { color: "white" },
									"& input": { color: "white" },
								}}
							/>
						)}
						{!IDerror && (
							<TextField
								variant="standard"
								label="Event Record ID"
								value={eventID}
								size="small"
								onChange={(event) => {
									setEventID(event.target.value);
								}}
								fullWidth
								sx={{
									"& label": { color: "white" },
									"& input": { color: "white" },
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
						<Button
							bordered
							color="warning"
							auto
							disabled={!eventID}
							onClick={handleCheckID}
						>
							confirm
						</Button>
						{successMsg && (
							<Snackbar
								open={successMsg}
								autoHideDuration={200}
								onClose={handleCloseMessage}
								anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
							>
								<Alert severity="success">
									Your booking record was found! Please re-fill up this form to
									update us about your booking :)
								</Alert>
							</Snackbar>
						)}
						{confirmCancelDialog}
						{succesCancellation}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
