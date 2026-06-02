import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  const [goldBidDir, setGoldBidDir] = useState("neutral");
  const [goldAskDir, setGoldAskDir] = useState("neutral");
  const [silverBidDir, setSilverBidDir] = useState("neutral");
  const [silverAskDir, setSilverAskDir] = useState("neutral");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.screen.width <= 768); // 🔥 screen.width ignores zoom
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const prev = useRef({
    goldBid: null,
    goldAsk: null,
    silverBid: null,
    silverAsk: null,
    platinumBid: null,
    platinumAsk: null,
  });

  const detectChange = (prevVal, currVal, setDir) => {
    if (prevVal === null) return currVal;

    if (currVal > prevVal) {
      setDir("rise");
      setTimeout(() => setDir("neutral"), 800);
    } else if (currVal < prevVal) {
      setDir("fall");
      setTimeout(() => setDir("neutral"), 800);
    }

    return currVal;
  };

  useEffect(() => {
    prev.current.goldBid = detectChange(
      prev.current.goldBid,
      goldData.bid,
      setGoldBidDir,
    );
  }, [goldData.bid]);

  useEffect(() => {
    prev.current.goldAsk = detectChange(
      prev.current.goldAsk,
      goldData.ask,
      setGoldAskDir,
    );
  }, [goldData.ask]);

  useEffect(() => {
    prev.current.silverBid = detectChange(
      prev.current.silverBid,
      silverData.bid,
      setSilverBidDir,
    );
  }, [silverData.bid]);

  useEffect(() => {
    prev.current.silverAsk = detectChange(
      prev.current.silverAsk,
      silverData.ask,
      setSilverAskDir,
    );
  }, [silverData.ask]);

  const getColors = (dir) => {
    if (dir === "rise")
      return {
        bgColor: "#4dbf00",
        border: "1px solid #008f0c",
        color: "white",
      };
    if (dir === "fall")
      return {
        bgColor: "#FF0040",
        border: " 1px solid #ff3366",
        color: "white",
      };
    return {
      bgColor: "#F0F8FF00",
      border: " 1px solid #FFFFFF",
      color: "#fff",
    };
  };

  const PricePulse = ({ label, value, dir }) => {
    const { bgColor, border, color } = getColors(dir);
    const hasPulse = dir !== "neutral";

    return (
      <Box
        sx={{
          position: "relative",
          flex: 1,
          mb: ".5vw",

          overflow: "hidden",
          ...(hasPulse && {
            animation:
              dir === "rise"
                ? "pulseRise 0.8s ease-out"
                : "pulseFall 0.8s ease-out",
            bgcolor:
              dir === "rise"
                ? "0 0 0 0 rgba(0,255,157,0.6)"
                : "0 0 0 0 rgba(255,51,102,0.6)",
          }),
        }}
      >
        <Typography
          sx={{
            // fontSize: "1vw",

            fontSize: {
              xs: "15px", // mobile
              sm: "2.5vw", // small tablets
              md: "1.5vw", // laptops
            },
            letterSpacing: "0.25vw",
            color: "#fff",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            // fontSize: "2.4vw",
            fontSize: {
              xs: "18px", // mobile
              sm: "2.5vw", // small tablets
              md: "1.8vw", // laptops
              lg: "2.4vw", // desktop
              xl: "2.4vw", // large screens
            },
            fontWeight: 800,
            letterSpacing: "0.18vw",
            textAlign: "center",
            bgcolor: bgColor,
            color: color,
            border: border,
            borderRadius: "1vw",
            fontVariantNumeric: "tabular-nums",
            transition: "all 0.4s ease",
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const MetalPanel = ({ data, bidDir, askDir, theme }) => {
    const isSilver = theme === "silver";

    let title = "GOLD";
    let gradient = "linear-gradient(90deg, #FFF098)";
    let shadow = "0 0 3vw rgba(255 217 0 / 0.11) inset";

    if (isSilver) {
      title = "SILVER";
      gradient = "linear-gradient(90deg, #FFFFFF )";
      shadow = "0 0 3vw rgba(160,180,255,0.15) inset";
    }

    return (
   <Box
  sx={{
    position: "relative",
    overflow: "hidden",

    borderRadius: {
      xs: "20px",
      md: "1.5vw",
    },

    backdropFilter: "blur(14px)",

    // Premium Blue Theme
    background: `
      linear-gradient(
        145deg,
        rgba(5, 15, 35, 0.96) 0%,
        rgba(10, 38, 78, 0.92) 45%,
        rgba(6, 18, 42, 0.98) 100%
      )
    `,

    border: "1px solid rgba(255, 215, 0, 0.15)",

    boxShadow: `
      0 10px 35px rgba(0,0,0,0.45),
      inset 0 1px 0 rgba(255,255,255,0.06),
      0 0 20px rgba(58,140,255,0.12)
    `,

    padding: {
      xs: "18px",
      sm: "1vw 1.6vw",
      md: "1.2vw",
    },

    display: "grid",
    alignItems: "center",

    gap: {
      xs: "16px",
      md: "1vw",
    },

    gridTemplateColumns: {
      xs: "1fr",
      md: ".7fr 1fr 1fr",
    },

    transition: "all 0.35s ease",


    // Premium Border
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,

      padding: "1px",
      borderRadius: "inherit",

      background: `
        linear-gradient(
          135deg,
          rgba(255,255,255,0.12),
          rgba(59,164,255,0.45),
          rgba(255,215,0,0.38),
          rgba(255,255,255,0.08)
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

    // Ambient Glow
    "&::after": {
      content: '""',
      position: "absolute",

      width: "180px",
      height: "180px",

      borderRadius: "50%",

      background: "rgba(0,140,255,0.10)",
      filter: "blur(80px)",

      top: "-40%",
      right: "-10%",

      pointerEvents: "none",
    },
  }}
>
  {/* LEFT */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      zIndex: 2,
    }}
  >
    <Box
      sx={{
        width: {
          xs: "58px",
          md: "4.2vw",
        },

        height: {
          xs: "58px",
          md: "4.2vw",
        },

        objectFit: "contain",

        filter: `
          drop-shadow(0 0 12px rgba(255,215,0,0.22))
        `,
      }}
      component="img"
      src={isSilver ? "/images/silver-bar.png" : "/images/gold-bar.png"}
      alt={title}
    />

    <Box
      sx={{
        fontSize: {
          xs: "14px",
          md: "1.3vw",
        },

        fontWeight: 800,

        letterSpacing: "0.14em",

        mt: "0.4vw",

        background: isSilver
          ? "linear-gradient(90deg,#D9E7FF,#8FB8FF,#FFFFFF)"
          : "linear-gradient(90deg,#FFF2A6,#FFD66B,#FFF7D6)",

        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",

        textTransform: "uppercase",
      }}
    >
      {title}
    </Box>
  </Box>

  {/* BID */}
  <Box
    sx={{
      fontSize: {
        xs: "15px",
        sm: "2vw",
        md: "1.2vw",
        lg: "1vw",
      },

      color: "#fff",
      fontWeight: 700,
      zIndex: 2,
    }}
  >
    <PricePulse label="BID" value={data.bid} dir={bidDir} />

    <Box
      sx={{
        mt: "0.35vw",
        textAlign: "center",
        color: "rgba(255,255,255,0.72)",

        fontWeight: 600,
        letterSpacing: "0.08em",
      }}
    >
      LOW{" "}
      <span
        className="hl-value-low"
        style={{
          color: "#69AFFF",
          fontWeight: 800,
        }}
      >
        {data.low}
      </span>
    </Box>
  </Box>

  {/* ASK */}
  <Box
    sx={{
      fontSize: {
        xs: "15px",
        sm: "2vw",
        md: "1.2vw",
        lg: "1vw",
      },

      color: "#fff",
      fontWeight: 700,
      zIndex: 2,
    }}
  >
    <PricePulse label="ASK" value={data.ask} dir={askDir} />

    <Box
      sx={{
        mt: "0.35vw",
        textAlign: "center",
        color: "rgba(255,255,255,0.72)",

        fontWeight: 600,
        letterSpacing: "0.08em",
      }}
    >
      HIGH{" "}
      <span
        className="hl-value-high"
        style={{
          color: "#FFD76A",
          fontWeight: 800,
        }}
      >
        {data.high}
      </span>
    </Box>
  </Box>
</Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: "1vw",
        width: "100%",
        alignItems: "end",
        marginTop: {
          xs: "20px", // mobile
          sm: "0vw", // small tablets
        },
        gridTemplateColumns: { xs: "1fr" },
      }}
    >
      <MetalPanel
        data={goldData}
        bidDir={goldBidDir}
        askDir={goldAskDir}
        theme="gold"
      />

      <MetalPanel
        data={silverData}
        bidDir={silverBidDir}
        askDir={silverAskDir}
        theme="silver"
      />
    </Box>
  );
};

export default SpotRate;
