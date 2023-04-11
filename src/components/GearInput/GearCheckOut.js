import React, { useState, useEffect } from "react";
import {
	Box,
	FormLabel,
	FormControl,
	FormControlLabel,
	Checkbox,
	Autocomplete,
	TextField,
	CircularProgress,
} from "@mui/material";
import {
	CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
	CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import Stack from "@mui/material/Stack";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const iFrameGear = (
	<iframe
		className="airtable-embed"
		title="AirtableGearView"
		src="https://airtable.com/embed/shrmH9r8B0Zd8LwcU?backgroundColor=red"
		sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
		loading="lazy"
		width="100%"
		height="533"
	/>
);

const GearInput = ({
	gear,
	handleGearSelectionChange,
	open,
	setOpen,
	options,
	loading,
}) => {
	return (
		<FormControl variant="standard">
			<Autocomplete
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				multiple
				freeSolo
				disableCloseOnSelect
				value={gear}
				onChange={handleGearSelectionChange}
				id="Search-for-course"
				options={options}
				getOptionLabel={(option) =>
					typeof option === "string" ? option : option.name
				}
				renderOption={(props, option, { selected }) => (
					<li {...props}>
						<Checkbox
							icon={icon}
							checkedIcon={checkedIcon}
							style={{ marginRight: 8 }}
							checked={selected}
						/>
						{option.name}
					</li>
				)}
				renderInput={(params) => (
					<TextField
						{...params}
						variant="outlined"
						label="Add Gear(s)"
						helperText="Available gear can be viewed below."
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress color="inherit" size={20} />
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</FormControl>
	);
};

const GearCheckOut = ({ setGearSelected, gearList, addGear, setAddGear }) => {
	const [gear, setGear] = useState([]);
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		if (!loading) return;

		let active = true;

		const fetchOptions = async () => {
			if (active) setOptions([...gearList]);
		};

		fetchOptions();

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

	const handleGearSelectionChange = (event, newValue) => {
		if (typeof newValue === "string") {
			setGear({ title: newValue });
		} else {
			setGear(newValue);
			setGearSelected(newValue);
		}
	};

	return (
		<Stack spacing={0}>
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
					<GearInput
						gear={gear}
						handleGearSelectionChange={handleGearSelectionChange}
						open={open}
						setOpen={setOpen}
						options={options}
						loading={loading}
					/>
					{iFrameGear}
				</Box>
			)}
		</Stack>
	);
};

export default GearCheckOut;
