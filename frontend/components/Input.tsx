import { Box, TextField, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";

const Input = ({
  label,
  type,
  name,
  control,
  error,
  register,
  value,
  required,
  sx,
}: any) => {
  const theme = useTheme();
  return (
    <Box style={{ margin: "12px 0px", padding: "0px" }} sx={sx}>
      <Controller
        name={name}
        control={control}
        defaultValue={value || ""}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            type={type}
            fullWidth
            error={!!error}
            helperText={error || ""}
            required={required}
            InputLabelProps={{
              shrink: !!field.value,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                backgroundColor: theme.palette.secondary.light,
                fontSize: theme.typography.body2.fontSize,
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: theme.typography.body2.fontSize,
                alignText: "center",
                color: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root.Mui-error": {
                "& fieldset": {
                  borderColor: "#f44336",
                },
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default Input;
