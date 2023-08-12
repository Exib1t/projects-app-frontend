import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoLink = () => {
  const navigate = useNavigate();

  return (
    <Typography
      variant="h5"
      fontWeight={700}
      color="primary.main"
      sx={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
    >
      Projects App
    </Typography>
  );
};
export default LogoLink;
