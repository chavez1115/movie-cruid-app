import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import ButtonComponent from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import withAuth from "@/utils/withAuth";
import { useRouter } from "next/router";
import { Box, Typography, useTheme } from "@mui/material";

const ManageMovie = () => {
  const [file, setFile] = useState<any>(null);
  const { register, handleSubmit, setValue, control } = useForm();
  const router = useRouter();
  const { movieId } = router.query;
  const [movie, setMovie] = useState<Movie | null>(null);
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1035);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 1035);
    };
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
    return () => window.removeEventListener("resize", updateIsMobile);
  }, [window.innerWidth]);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  useEffect(() => {
    if (movieId) {
      axios
        .get(backend_url + `/movies/${movieId}`)
        .then((response) => {
          const fetchedMovie = response.data.movie;
          setMovie(fetchedMovie);

          // Prepopulate form fields if editing
          setValue("title", fetchedMovie.title);
          setValue("year", fetchedMovie.year);
        })
        .catch((error) => console.error(error));
    }
  }, [movieId, setValue]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("year", data.year);

    if (file) {
      formData.append("poster", file);
    } else if (movie && movie.poster) {
      formData.append("poster", movie.poster);
    } else {
      alert("Please select an image or ensure there is an existing image");
      return;
    }

    try {
      if (movieId) {
        await axios.put(backend_url + `/movies/${movieId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Movie updated successfully!");
      } else {
        await axios.post(backend_url + "/movies/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Movie created successfully!");
      }
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Error saving movie");
    }
  };

  const onCancel = () => {
    router.push("/");
  };

  return (
    <Box>
      {!isMobile ? (
        <Box className="manage-movie">
          <Typography
            component="div"
            sx={{
              fontSize: theme.typography.h2.fontSize,
              lineHeight: theme.typography.h2.lineHeight,
            }}
          >
            {movieId ? "Edit" : "Create a New Movie"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="manage-movie-form">
            <ImageUpload
              onFileSelect={handleFileSelect}
              initialImage={
                movieId && movie
                  ? backend_url + "/uploads/posters/" + movie.poster
                  : undefined
              }
            />
            <Box className="right-pane">
              <Input
                label="Title"
                type="string"
                name="title"
                value={movie ? movie.title : ""}
                control={control}
                register={register}
                required
                sx={{ width: "362px" }}
              />
              <Box style={{ width: "200px", textAlign: "left" }}>
                <Input
                  label="Publishing Year"
                  type="number"
                  name="year"
                  value={movie ? movie.year : ""}
                  control={control}
                  register={register}
                  required
                  sx={{
                    width: "216px",
                    textAlign: "left",
                  }}
                />
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "54px",
                }}
              >
                <ButtonComponent
                  type="button"
                  label="Cancel"
                  outlined
                  onClick={onCancel}
                  sx={{ width: "179px", height: "56px" }}
                />
                <ButtonComponent
                  type="submit"
                  label={movieId ? "Update" : "Submit"}
                  sx={{ width: "179px", height: "56px" }}
                />
              </Box>
            </Box>
          </form>
        </Box>
      ) : (
        <Box className="manage-movie-mobile">
          <Typography
            component="div"
            sx={{
              fontSize: theme.typography.h3.fontSize,
              lineHeight: theme.typography.h3.lineHeight,
            }}
            className="title"
          >
            {movieId ? "Edit" : "Create a New Movie"}
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="manage-movie-mobile-form"
          >
            <Input
              label="Title"
              type="string"
              name="title"
              value={movie ? movie.title : ""}
              control={control}
              register={register}
              required
              sx={{ width: "100%" }}
            />
            <Input
              label="Publishing Year"
              type="number"
              name="year"
              value={movie ? movie.year : ""}
              control={control}
              register={register}
              required
              sx={{ width: "100%" }}
            />
            <ImageUpload
              onFileSelect={handleFileSelect}
              initialImage={
                movieId && movie
                  ? backend_url + "/uploads/posters/" + movie.poster
                  : undefined
              }
            />
            <Box className="button-group">
              <ButtonComponent
                type="button"
                label="Cancel"
                outlined
                onClick={onCancel}
                sx={{ width: "182px", height: "56px" }}
              />
              <ButtonComponent
                type="submit"
                label={movieId ? "Update" : "Submit"}
                sx={{ width: "182px", height: "56px" }}
              />
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default withAuth(ManageMovie);
