import React from "react";
import { Box, Checkbox, FormControlLabel, useTheme } from "@mui/material";

const CustomCheckbox = ({ checked, onChange, label }: any) => {
  const theme = useTheme();
  return (
    <Box
      style={{
        width: "300px",
        margin: "0 auto",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <FormControlLabel
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: theme.typography.body2.fontSize,
          },
        }}
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            sx={{
              padding: theme.spacing(1),
              "& .MuiCheckbox-root": {
                border: "none",
              },
              "& .MuiCheckbox-checkbox": {
                borderRadius: "5px",
                backgroundColor: theme.palette.secondary.light,
                border: "none",
              },
              "& .MuiCheckbox-checked": {
                backgroundColor: "#4F8F95",
                borderColor: "#4F8F95",
              },
              "& .MuiCheckbox-indeterminate": {
                backgroundColor: "#6A7B86",
                borderColor: "#6A7B86",
              },
              "&:hover .MuiCheckbox-checkbox": {
                backgroundColor: theme.palette.secondary.light,
              },
            }}
          />
        }
        label={label}
      />
    </Box>
  );
};

export default CustomCheckbox;
