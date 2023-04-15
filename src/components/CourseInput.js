import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Stack from "@mui/material/Stack";
import base from "./airtable";
import { Text } from "@nextui-org/react";

const fetchCourses = async () => {
	let courseList = [];

	await base("Classes")
		.select({
			view: "ALL CLASSES",
		})
		.eachPage((records, fetchNextPage) => {
			records.forEach((record) => {
				const className = record.get("Name");
				const classDay = record.get("Week Day(s)");
				const classTime = record.get("Meeting Time");

				if (className) {
					let displayText = className;
					if (classDay) {
						displayText += ", " + String(classDay).substring(0, 3);
					}
					if (classTime) {
						displayText += ", " + String(classTime);
					}
					courseList.push({ key: record.id, name: displayText });
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
  
	const handleCourseAssignmentChange = (event) => {
	  setAddCourse(event.target.checked);
	};
  
	const handleCourseSelectionChange = (event, newCourses) => {
	  setCourseSelected(newCourses);
	};
  
	const renderOption = (props, option, { selected }) => {
	  const uncheckedIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
	  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  
	  return (
		<li {...props}>
		  <Checkbox
			icon={uncheckedIcon}
			checkedIcon={checkedIcon}
			checked={selected}
		  />
		  <Text>{option.name}</Text>
		</li>
	  );
	};
  
	const renderInput = (params) => (
	  <TextField
		className="w-full"
		{...params}
		variant="standard"
		label="Select course(s)"
		fullWidth
	  />
	);
  
	return (
	  <Stack>
		<FormControlLabel
		  control={
			<Checkbox
			  checked={addCourse}
			  onChange={handleCourseAssignmentChange}
			/>
		  }
		  label={<Text>Is this time slot for a course assignment?</Text>}
		/>
  
		{addCourse && (
		  <FormControl variant="standard" className="w-full">
			<Autocomplete
			  multiple
			  disableCloseOnSelect
			  value={courseSelected}
			  onChange={handleCourseSelectionChange}
			  id="Search-for-course"
			  options={courses}
			  getOptionLabel={({ name }) => name}
			  renderOption={renderOption}
			  renderInput={renderInput}
			/>
		  </FormControl>
		)}
	  </Stack>
	);
  };
  
  export default CourseSelectionInput;
  