import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const SystemClock = () => {
  const [timeData, setTimeData] = useState({
    day: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dayStr = now
        .toLocaleDateString("en-GB", { weekday: "long" })
        .toUpperCase();

      const dateStr = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();

      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTimeData({
        day: dayStr,
        date: dateStr,
        time: timeStr,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glass Container */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1vw",
          width: "100%",
          padding: {
            xs: "8px 18px",
            md: "0.45vw 2.5vw",
          },
          // borderRadius: "20px",
          // border: "1px solid rgba(255, 204, 92, 0.22)",
          // background:
          //   "linear-gradient(135deg, rgba(18, 10, 0, 0.56), rgba(82, 49, 4, 0.34), rgba(18, 10, 0, 0.62))",
          // boxShadow:
          //   "inset 0 1px 0 rgba(255,239,184,0.14), 0 0 18px rgba(255,174,31,0.08)",
          // backdropFilter: "blur(10px)",
        }}
      >
        {/* Date */}
        <Typography
          sx={{
            fontSize: {
              xs: "12px",
              sm: "2vw",
            },
            fontWeight: 400,
            letterSpacing: "2px",
            color: "#FFE9A6",
            textShadow: "0 0 10px rgba(255, 196, 68, 0.34)",
          }}
        >
          {timeData.date || "-- --- ----"}
        </Typography>
        {/* Day */}
        <Typography
          sx={{
            fontSize: {
              xs: "12px",
              sm: "1vw",
            },
            color: "rgba(255, 239, 184, 0.74)",
            letterSpacing: "2px",
          }}
        >
          {timeData.day || "-----"}
        </Typography>
      </Box>
    </Box>
  );
};

export default SystemClock;
