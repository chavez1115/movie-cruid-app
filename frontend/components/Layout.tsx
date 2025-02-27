import { Box } from "@mui/material";
import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box>
      <Box
        sx={{ minHeight: { xs: "826px", sm: "800px" }, position: "relative" }}
      >
        {children}
      </Box>
      <LanguageSwitcher />

      <Box className="background-image">
        <img
          src="/bottom.png"
          style={{ width: "100%", height: "100px", display: "block" }}
        />
      </Box>
    </Box>
  );
};

export default Layout;
