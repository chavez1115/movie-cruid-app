import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Input from "@/components/Input";
import CustomCheckbox from "@/components/CustomCheckbox";
import ButtonComponent from "@/components/Button";
import Layout from "@/components/Layout";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { user, signIn } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data: any) => {

    console.log(errors);
    if (data.email && data.password) {
      signIn({ email: data.email });
      router.push("/");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <Layout>
      <Box
        sx={{
          padding: { xs: "295px 24px", sm: "220px 550px" },
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: theme.typography.h2.fontSize,
              sm: theme.typography.h1.fontSize,
            },
            lineHeight: {
              xs: theme.typography.h2.lineHeight,
              sm: theme.typography.h1.lineHeight,
            },
          }}
          component="div"
          gutterBottom
        >
          {t("signin")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={t("email")}
            type="email"
            name="email"
            control={control}
            register={register}
            error={errors.email?.message}
            sx={{ width: { sm: "300px", xs: "380px" }, height: "54px" }}
            required
          />
          <Input
            label={t("password")}
            type="password"
            name="password"
            control={control}
            register={register}
            error={errors.password?.message}
            sx={{ width: { sm: "300px", xs: "380px" }, height: "54px" }}
            required
          />
          <CustomCheckbox label={t("remember-me")} />
          <ButtonComponent
            type="submit"
            label={t("login")}
            sx={{
              marginTop: "24px",
              width: { sm: "300px", xs: "380px" },
              height: "54px",
            }}
          />
        </form>
      </Box>
    </Layout>
  );
};

export default Login;
