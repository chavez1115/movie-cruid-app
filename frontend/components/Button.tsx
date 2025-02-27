import { Box, Button, useTheme } from "@mui/material";

interface ButtonComponentProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  outlined?: boolean;
  sx?: any;
}

const ButtonComponent = ({
  label,
  type = "button",
  onClick,
  outlined = false,
  sx
}: ButtonComponentProps) => {
  const theme = useTheme();
  return (
    <Box sx={sx}>
      <Button
        type={type}
        onClick={onClick}
        fullWidth
        sx={{
          backgroundColor: outlined ? "transparent" : theme.palette.primary.main,
          color: "white",
          height: "100%",
          fontWeight: "bold",
          borderRadius: "10px",
          textTransform: "none",
          border: outlined ? `1px solid #fff` : "none",
          "&:hover": {
            backgroundColor: outlined ? "rgba(45, 209, 126, 0.1)" : "#45a049",
            borderColor: outlined ? "#45a049" : "none",
          },
        }}
      >
        {label}
      </Button>
    </Box>
  );
};

export default ButtonComponent;
