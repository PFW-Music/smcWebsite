import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
	Box,
	Checkbox,
	FormControlLabel,
	FormLabel,
	TextField,
} from "@mui/material";

import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";

const sleep = async (delay = 0) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

const GearFilter = ({ filterTerm, setFilterTerm }) => {
	return (
		<TextField
			variant="standard"
			id="outlined-name"
			label="Filter Gear List"
			value={filterTerm}
			onChange={(event) => {
				setFilterTerm(event.target.value.toLowerCase());
			}}
		/>
	);
};

function renderAvailableGearItem({ gearItem, handleAddGear }) {
	let image;

	if (typeof gearItem.image !== "undefined") {
		image = gearItem.image[0].url;
	} else {
		image = "/imageIcon.png";
	}

	return (
		<Paper
			variant="outlined"
			sx={{
				padding: 1,
				boxShadow: 1,
				width: "100%",
				textAlign: "center",
				cursor: "pointer",
			}}
			onClick={() => handleAddGear(gearItem)}
		>
			<Paper />
			<Image
				src={image}
				alt={gearItem.id}
				width={100}
				height={100}
				layout="responsive"
				fit="contain"
			/>
			<p>{gearItem.name}</p>
		</Paper>
	);
}
const AvailableGear = ({
	gearList,
	filterTerm,
	gearSelected,
	setGearSelected,
}) => {
	const handleAddGear = (event) => {
		let tempGear = Array.from(gearSelected);
		tempGear.push(gearList.find((element) => element.id === event.id));
		setGearSelected(tempGear);
	};

	const availableDisplayFilter = (gearItem) => {
		if (gearSelected.includes(gearItem)) {
			return false;
		}
		let terms = String(filterTerm).split(/\s+/);
		let foundTermCount = 0;
		for (let i = 0; i < terms.length; i++) {
			if (gearItem.name.toLowerCase().includes(terms[i].toLowerCase())) {
				foundTermCount++;
			}
		}
		return foundTermCount === terms.length;
	};

	return (
		<Paper
			variant="outlined"
			sx={{ mt: 2, boxShadow: 1, width: "100%", padding: 1 }}
		>
			<Paper />
			<Grid
				container
				spacing={{ xs: 1, md: 1 }}
				columns={{ xs: 2, sm: 4, md: 12 }}
				height={500}
				sx={{ overflow: "auto" }}
			>
				{Array.from(gearList)
					.filter(availableDisplayFilter)
					.map((gearItem) => (
						<Grid item xs={2} sm={4} md={4} key={gearItem.id}>
							{renderAvailableGearItem({ gearItem, handleAddGear })}
						</Grid>
					))}
			</Grid>
		</Paper>
	);
};

function renderChosenGearItem({ gearItem, handleRemoveGear }) {
	let image;
	if (typeof gearItem.image !== "undefined") {
		image = gearItem.image[0].url;
	} else {
		image = "/imageIcon.png";
	}

	return (
		<ListItem
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					title="Delete"
					onClick={() => handleRemoveGear(gearItem)}
					size="large"
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<Image
				src={image}
				alt={gearItem.id}
				width={50}
				height={70}
				fit="contain"
			/>
			<ListItemText primary={gearItem.name} sx={{ marginLeft: 2 }} />
		</ListItem>
	);
}
const ChosenGear = ({ gearList, gearSelected, setGearSelected }) => {
	const handleRemoveGear = (event) => {
		let tempGear = Array.from(gearSelected);
		let index = tempGear.indexOf(
			gearList.find((element) => element.id === event.id)
		);
		tempGear.splice(index, 1);
		setGearSelected(tempGear);
	};

	return (
		<Stack sx={{ width: "100%", mt: 2 }}>
			<FormLabel component="legend">Chosen Gear:</FormLabel>
			{gearSelected.length !== 0 && (
				<Paper variant="outlined" sx={{ boxShadow: 1 }}>
					<Paper />
					<List>
						<List>
							{gearSelected.map((gearItem) => (
								<React.Fragment key={gearItem.id}>
									{/*{index !== 0 && <Divider />}*/}
									<Collapse in={true} key={gearItem.id}>
										{renderChosenGearItem({ gearItem, handleRemoveGear })}
									</Collapse>
								</React.Fragment>
							))}
						</List>
					</List>
				</Paper>
			)}
		</Stack>
	);
};

const GearCheckOut = ({
	gearSelected,
	setGearSelected,
	gearList,
	addGear,
	setAddGear,
}) => {
	const open = false;
	const [options, setOptions] = useState([]);
	const [filterTerm, setFilterTerm] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		if (!loading) return;

		let active = true;
		(async () => {
			await sleep(1000);
			if (active) setOptions([...gearList]);
		})();

		return () => {
			active = false;
		};
	}, [loading, gearList]);

	useEffect(() => {
		if (!open) setOptions([]);
	}, [open]);

	const handleGearCheckboxChange = (event) => {
		setAddGear(event.target.checked);
	};

	return (
		<Stack>
			<Box className="flex items-start flex-wrap text-left m-2 text-xl font-mono leading-8 w-96">
				<FormLabel component="legend">
					Need to checkout gear for the event?
				</FormLabel>
				<FormControlLabel
					control={
						<Checkbox checked={addGear} onChange={handleGearCheckboxChange} />
					}
					label="Gear check-out"
				/>
			</Box>

			{addGear && (
				<Box className="flex items-start flex-wrap justify-center">
					<GearFilter filterTerm={filterTerm} setFilterTerm={setFilterTerm} />
					<AvailableGear
						gearList={gearList}
						filterTerm={filterTerm}
						gearSelected={gearSelected}
						setGearSelected={setGearSelected}
					/>
					<ChosenGear
						gearList={gearList}
						gearSelected={gearSelected}
						setGearSelected={setGearSelected}
					/>
				</Box>
			)}
		</Stack>
	);
};

export default GearCheckOut;
