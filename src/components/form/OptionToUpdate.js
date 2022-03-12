import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function OptionToUpdate() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: pink[600],
      "&:hover": {
        backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity)
      }
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: pink[600]
    }
  }));

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start"}} >
    <FormControl sx={{ m: 2, textAlign: "left"}} variant="standard">
      <FormLabel component="legend">
            If you have an existing booking:
      </FormLabel>
      <FormControlLabel
        control={
          <GreenSwitch {...label} checked={checked} onChange={handleChange} />
        }
        label="I want to update my booking"
      />
      </FormControl>
      </Box>

  );
}
