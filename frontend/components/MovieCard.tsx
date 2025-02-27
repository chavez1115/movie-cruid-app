import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

const CardImage = styled(CardMedia)(({ theme }) => ({
  height: 400,
  width: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: theme.spacing(1.5),
}));

const MovieCard = ({ image, title, year, onClick }: any) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        backgroundColor: theme.palette.secondary.main,
        padding: {
          sm: theme.spacing(1),
          xs: 0,
        },
        margin: theme.spacing(1.25),
        width: {
          xs: 180,
          sm: 282,
        },
        height: {
          xs: 334,
          sm: 504,
        },
        borderRadius: theme.spacing(1.5),
        transition: "background-color 0.3s ease",
        "&:hover": { backgroundColor: "rgba(8, 41, 53, 0.55)" },
        color: theme.palette.common.white,
      }}
    >
      <CardImage
        image={image}
        title={title}
        sx={{ height: { sm: 400, xs: 246 } }}
      />
      <CardContent
        sx={{
          paddingBottom: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: theme.typography.h6.fontSize, sm: theme.typography.body1.fontSize },
            lineHeight: { xs: theme.typography.h6.lineHeight, sm: theme.typography.body1.lineHeight },
          }}
          component="div"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body2">{year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
