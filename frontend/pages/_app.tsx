import "../styles/global.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/styleguide";
import i18n from "../lib/i18n";
import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <Component {...pageProps} />
        </I18nextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
