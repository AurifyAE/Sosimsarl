import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const clockConfig = [
  {
    key: "usa",
    label: "USA",
    timeZone: "America/New_York",
    flag: "/images/usa.png",
  },
  {
    key: "uae",
    label: "UAE",
    timeZone: "Asia/Dubai",
    flag: "/images/uae.png",
  },
  {
    key: "london",
    label: "LONDON",
    timeZone: "Europe/London",
    flag: "/images/uk.png",
  },
];

const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const updatedTimes = {};

      clockConfig.forEach((clock) => {
        updatedTimes[clock.key] = now.toLocaleTimeString("en-US", {
          ...timeOptions,
          timeZone: clock.timeZone,
        });
      });

      setTimes(updatedTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: {
          xs: "10px",
          md: "1vw",
        },
        width: "100%",
        px: {
          xs: "10px",
          md: "1vw",
        },
        py: {
          xs: "8px",
          md: "0.55vw",
        },
        border: "1px solid rgba(255, 204, 92, 0.28)",
        borderRadius: {
          xs: "16px",
          md: "1vw",
        },
        background: `
          linear-gradient(
            135deg,
            rgba(18, 10, 0, 0.78) 0%,
            rgba(70, 43, 4, 0.58) 48%,
            rgba(18, 10, 0, 0.82) 100%
          )
        `,
        boxShadow: `
          inset 0 1px 0 rgba(255, 239, 184, 0.18),
          inset 0 -1px 0 rgba(117, 72, 0, 0.35),
          0 0 22px rgba(255, 174, 31, 0.12)
        `,
        backdropFilter: "blur(10px)",
      }}
    >
      {clockConfig.map((clock) => (
        <Box
          key={clock.key}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: "8px",
              lg: "0.75vw",
            },
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
            px: {
              xs: "6px",
              md: "0.7vw",
            },
            py: {
              xs: "4px",
              md: "0.25vw",
            },
            borderRight:
              clock.key === clockConfig[clockConfig.length - 1].key
                ? "none"
                : "1px solid rgba(255, 211, 112, 0.22)",
            "&:hover": {
              background:
                "linear-gradient(90deg, transparent, rgba(255, 189, 57, 0.08), transparent)",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "30px",
                lg: "3vw",
              },
              minWidth: {
                xs: "30px",
                lg: "3vw",
              },
              p: "2px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(255,239,184,0.9), rgba(170,101,0,0.72), rgba(255,210,94,0.95))",
              boxShadow: "0 0 12px rgba(255, 183, 49, 0.32)",
            }}
          >
            <img
              src={clock.flag}
              alt={clock.label}
              style={{
                borderRadius: "50%",
                display: "block",
                height: "auto",
                width: "100%",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "12px",
                  lg: "0.85vw",
                },
                fontWeight: 700,
                letterSpacing: "0.12em",
                lineHeight: 1,
                color: "rgba(255, 239, 184, 0.78)",
                textShadow: "0 0 8px rgba(255, 185, 49, 0.25)",
              }}
            >
              {clock.label}
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  lg: "1.05vw",
                },
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#FFE9A6",
                fontVariantNumeric: "tabular-nums",
                textShadow: `
                  0 0 10px rgba(255, 196, 68, 0.46),
                  0 1px 0 rgba(0, 0, 0, 0.65)
                `,
              }}
            >
              {times[clock.key] || "--:--"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WorldClockHorizontal;
