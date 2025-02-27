import { Box, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";

interface ImageUploadProps {
  onFileSelect: (file: File | null) => void;
  initialImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  initialImage,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const theme = useTheme();

  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.light,
    height: {
      sm: 504,
      xs: 372,
    },
    width: {
      sm: 473,
      xs: 380,
    },
    alignContent: "center",
    marginRight: "120px",
  };

  useEffect(() => {
    if (initialImage) {
      setImage(null);
    }
  }, [initialImage]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setImage(file);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      onFileSelect(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
  } as unknown as DropzoneOptions);

  return (
    <Box sx={{marginTop: "12px", marginBottom: "40px"}}>
      <Box {...getRootProps()} sx={{ ...dropzoneStyle }}>
        <input {...getInputProps()} onChange={onFileChange} required={!initialImage} />
        {image ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ) : initialImage ? (
          <Box sx={{ width: "100%", height: "100%" }}>
            <img
              src={initialImage}
              alt="Initial Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        ) : (
          <Box>
            <img src="/file_download_black_24dp_1.png" />
            <p>Drop an image here</p>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
