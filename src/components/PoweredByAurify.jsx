import React from "react";
import { Box, Typography } from "@mui/material";
import AurifyLogo from "/images/aurify-logo.svg";

const PoweredByAurify = () => {
  return (
    <Box
      sx={{
        textDecoration: "none",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6vw",
        padding: "0.8vw 1.4vw",
        // borderRadius: "999px",
        // border: "1px solid rgba(255, 204, 92, 0.16)",
        // background:
        //   "linear-gradient(90deg, transparent, rgba(255, 189, 57, 0.08), transparent)",
        // margin: "0 auto",
      }}
    >
      <Typography
        component="a"
        href="https://www.aurify.ae"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          fontSize: { xs: "15px", md: "1.2vw" },

          fontWeight: 500,
          color: "rgba(255, 239, 184, 0.76)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5vw",
          whiteSpace: "nowrap",
          letterSpacing: "0.05em",
          textDecoration: "none",
          textShadow: "0 0 8px rgba(255, 185, 49, 0.18)",
        }}
      >
        Powered by
        <Box
          component="img"
          src={AurifyLogo}
          alt="Aurify"
          sx={{
            height: { xs: "5vw", md: "1.5vw" },
            objectFit: "contain",
          }}
        />
      </Typography>
    </Box>
  );
};

export default PoweredByAurify;
