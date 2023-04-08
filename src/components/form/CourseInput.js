import base from "../airtable";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";

////////////////////////////////////API Magic//////////////////////////////////////////////////////
let courseList = [];
let className = "";
let classDay = "";
let classTime = "";

base("Classes")
  .select({
    view: "ALL CLASSES", // Replace "Grid view" with the correct view name from your Airtable base
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        className = record.get("Name");
        classDay = record.get("Week Day(s)");
        classTime = record.get("Meeting Time");

        if (typeof className !== "undefined") {
          if (typeof classDay !== "undefined") {
            className += ", " + String(classDay).substring(0, 3);
          }
          if (typeof classTime !== "undefined") {
            className += ", " + String(classTime);
          }
          courseList.push({ key: record.id, name: className });
        }
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
      }
    }
  );

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// This will be used to store input data
let userCourse;

export default function CourseSelectionInput({
                                               setCourseSelected,
                                               addCourse,
                                               setAddCourse,
                                             }) {
  const [course, setCourse] = React.useState([]);

  const handleChangeCourse = (event) => {
    setAddCourse(event.target.checked);
  };

  const courseInput = (
    <div className="mt-2">
      <Autocomplete
        multiple
        freeSolo
        disableCloseOnSelect
        className="w-full"
        value={course}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setCourse({
              title: newValue,
            });
          } else {
            setCourse(newValue);
            userCourse = newValue;
            setCourseSelected(newValue);
            console.log(userCourse);
          }
        }}
        id="Search-for-course"
        options={courseList}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              className="mr-2"
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
            InputLabelProps={{
              className: "text-white"
            }}
            inputProps={{
              ...params.inputProps,
              className: "text-white"
            }}
          />
        )}
      ></Autocomplete>
    </div>
  );

  return (
    <div className="p-4 space-y-0">
      <div
        className="flex flex-col items-start flex-wrap text-left text-lg font-mono leading-6"
      >
        <label htmlFor="course-assignment" className="text-white">
          Is this time slot for a course assignment?
        </label>
        <div className="flex items-center">
          <Checkbox
            checked={addCourse}
            onChange={handleChangeCourse}
            inputProps={{ 'aria-label': 'Course assignment checkbox' }}
          />
          <label htmlFor="course-assignment" className="text-white">
            Course assignment
          </label>
        </div>
      </div>
      <div className="justify-center">
        {addCourse && courseInput}
      </div>
    </div>
  );
}