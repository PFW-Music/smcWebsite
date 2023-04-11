import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import base from "./airtable";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const fetchCourses = async () => {
	let courseList = [];

	await base("Classes")
		.select({
			view: "ALL CLASSES",
		})
		.eachPage((records, fetchNextPage) => {
			records.forEach((record) => {
				let className = record.get("Name");
				let classDay = record.get("Week Day(s)");
				let classTime = record.get("Meeting Time");

				if (className) {
					if (classDay) {
						className += ", " + String(classDay).substring(0, 3);
					}
					if (classTime) {
						className += ", " + String(classTime);
					}
					courseList.push({ key: record.id, name: className });
				}
			});

			fetchNextPage();
		});

	return courseList;
};

const CourseSelectionInput = ({
																courseSelected,
																setCourseSelected,
																addCourse,
																setAddCourse,
															}) => {
	const [courses, setCourses] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchCourses();
			setCourses(data);
		};

		fetchData();
	}, []);

	const handleChangeCourse = (event) => {
		setAddCourse(event.target.checked);
	};

	const handleCourseChange = (event, newCourses) => {
		setCourseSelected(newCourses);
	};

	return (
		<Stack spacing={0} sx={{ p: 2 }}>
			<Box
				className="flex flex-col items-start flex-wrap text-left text-xl font-mono leading-8"
			>
<<<<<<< HEAD
				<FormLabel sx={{ color: "white"}}>
=======
				<FormLabel component="legend" className="text-white">
>>>>>>> 9639ca62508635a2b9e5bbc402e874c838a765d9
					Is this time slot for a course assignment?
				</FormLabel>
				<FormControlLabel
					control={
						<Checkbox checked={addCourse} onChange={handleChangeCourse} />
					}
					label="Course assignment"
					className="text-white"
				/>
			</Box>
			<Box className="justify-center">
				{addCourse && (
					<Fade in={addCourse}>
						<FormControl sx={{ m: 1 }} variant="standard">
							<Autocomplete
								multiple
								freeSolo
								disableCloseOnSelect
								className="w-96"
								value={courseSelected}
								onChange={handleCourseChange}
								id="Search-for-course"
								options={courses}
								getOptionLabel={(option) => option.name}
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
										variant="standard"
										label="Select course(s)"
										fullWidth
										className="text-white"
									/>
								)}
							></Autocomplete>
						</FormControl>
					</Fade>
				)}
			</Box>
		</Stack>
	);
};

export default CourseSelectionInput;