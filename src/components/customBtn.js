import React from "react";
import { Button } from "@mui/material/";
import withStyles from '@mui/styles/withStyles';

const StyledButton = withStyles({
  root: {
    width: "230px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "44px",
    padding: "0 25px",
    boxSizing: "border-box",
    borderRadius: 0,
    background: "#000000",
    color: "#cccdcf",
    fontWeight: "Condensed Heavy",
    fontSize: "130%",
    transform: "none",
    transition: "background 0.5s,border-color .2s,color 0.2s",
    "&:hover": {
      backgroundColor: "#CFB991",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})(Button);

function CustomBtn(props) {
  return <StyledButton variant="contained"> {props.txt} </StyledButton>;
}

//test
export default CustomBtn;
