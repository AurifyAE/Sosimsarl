import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems = [] }) => {
  // Ensure enough items for smooth scrolling
  const tickerItems =
    newsItems.length <= 1 ? Array(5).fill(newsItems[0]) : newsItems;

  return (
   <Box
      sx={{
        position: "relative",
        width: "100%",

        height: {
          xs: "44px",
          lg: "3vw",
        },

        display: "flex",
        alignItems: "center",

        overflow: "hidden",

        

        backdropFilter: "blur(14px)",

        background: `
          linear-gradient(
            145deg,
            rgba(6,18,40,0.96) 0%,
            rgba(10,38,78,0.92) 50%,
            rgba(5,15,32,0.96) 100%
          )
        `,

        border: "1px solid rgba(255,215,0,0.14)",

        boxShadow: `
          0 8px 30px rgba(0,0,0,0.45),
          inset 0 1px 0 rgba(255,255,255,0.06),
          0 0 25px rgba(59,164,255,0.08)
        `,

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,

          padding: "1px",
          borderRadius: "inherit",

          background: `
            linear-gradient(
              135deg,
              rgba(255,255,255,0.10),
              rgba(59,164,255,0.42),
              rgba(255,215,0,0.32),
              rgba(255,255,255,0.06)
            )
          `,

          WebkitMask: `
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0)
          `,

          WebkitMaskComposite: "xor",
          maskComposite: "exclude",

          pointerEvents: "none",
        },
      }}
    >
      {/* LEFT BRAND */}
      <Typography
        sx={{
          position: "relative",
          zIndex: 2,

          color: "#fff",

          background: `
            linear-gradient(
              135deg,
              rgba(16,40,82,0.98),
              rgba(22,58,118,0.95)
            )
          `,

          fontSize: {
            xs: "11px",
            lg: "1vw",
          },

          fontWeight: 800,

          letterSpacing: "0.14em",

          whiteSpace: "nowrap",

          px: {
            xs: "16px",
            lg: "2vw",
          },

          height: "100%",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexShrink: 0,

          textTransform: "uppercase",

          borderRight: "1px solid rgba(255,215,0,0.14)",

          boxShadow: `
            0 0 20px rgba(59,164,255,0.10)
          `,
        }}
      >
        <Box
          component="span"
          sx={{
            background:
              "linear-gradient(90deg,#FFF1A8,#FFD76A,#FFF8D8)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SOSIMSARL Updates
        </Box>
      </Typography>
 
      {/* SCROLL AREA */}
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",

            animation: "ticker 70s linear infinite",
          }}
        >
          {tickerItems.map((item, index) => (
            <Typography
              key={index}
              component="span"
              sx={{
                color: "rgba(255,255,255,0.92)",

                fontSize: {
                  xs: "12px",
                  lg: "1vw",
                },

                fontWeight: 500,

                whiteSpace: "nowrap",

                marginRight: {
                  xs: "35px",
                  lg: "4vw",
                },

                letterSpacing: "0.03em",

                display: "flex",
                alignItems: "center",

                "&::before": {
                  content: '"✦"',
                  marginRight: "0.8vw",

                  color: "#FFD76A",

                  fontSize: {
                    xs: "10px",
                    lg: "0.8vw",
                  },
                },
              }}
            >
              {item?.description || ""}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(25%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          @keyframes pulseDot {
            0% {
              opacity: 1;
              transform: scale(1);
            }

            50% {
              opacity: 0.4;
              transform: scale(1.4);
            }

            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NewsTicker;
