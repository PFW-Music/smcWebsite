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
import base from "../airtable";

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
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          textAlign: "left",
          fontSize: 24,
          fontFamily: "Monospace",
          lineHeight: 2,
          flexDirection: "column",
        }}
      >
        <FormLabel component="legend" sx={{ color: "white" }}>
          Is this time slot for a course assignment?
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox checked={addCourse} onChange={handleChangeCourse} />
          }
          label="Course assignment"
          sx={{ color: "white" }}
        />
      </Box>
      <Box sx={{ justifyContent: "center" }}>
        {addCourse && (
          <Fade in={addCourse}>
            <FormControl sx={{ m: 1 }} variant="standard">
              <Autocomplete
                multiple
                freeSolo
                disableCloseOnSelect
                sx={{ width: 600 }}
                value={courses}
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
                    sx={{
                      "& label": { color: "white" },
                      "& input": { color: "white" },
                    }}
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