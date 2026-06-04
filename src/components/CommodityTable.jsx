import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ title, items }) => {
  const { goldData, silverData } = useSpotRate();

  // ✅ FIXED: Minted bars treated as gold
  const getSpot = (metal) => {
    const lower = metal?.toLowerCase() || "";

    if (lower.includes("gold") || lower.includes("minted")) {
      return goldData; // ✅ minted uses gold spot
    }

    if (lower.includes("silver")) return silverData;

    return null;
  };

  // const purityFactor = (purity) =>
  //   purity ? purity / 10 ** String(purity).length : 1;

  // safe handling purity factor calculation for decimal purity values (like 999.9)
  const purityFactor = (purity) => {
    if (!purity) return 1;

    const num = Number(purity);

    return num > 1000 ? num / 10000 : num / 1000;
  };


  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";

    const intLen = Math.floor(Math.abs(value)).toString().length;

    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;

    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows =
    items
      ?.map((item) => {
        const spot = getSpot(item.metal);
        // 🔥 IMPORTANT: fallback to goldData
        const effectiveSpot = spot || goldData;
        if (!effectiveSpot) return null;

        const mult = UNIT_MULTIPLIER[item.weight] || 1;
        const pur = purityFactor(item.purity);
        const unitValue = Number(item.unit) || 1;

        const baseBid =
          (effectiveSpot.bid / OUNCE) * AED * mult * unitValue * pur;

        const baseAsk =
          (effectiveSpot.ask / OUNCE) * AED * mult * unitValue * pur;

        return {
          metal_name: item.metal_name,
          purity: item.purity,
          metal: item.metal,
          unit: `${unitValue} ${item.weight}`,
          bid:
            baseBid +
            (Number(item.buyCharge) || 0) +
            (Number(item.buyPremium) || 0),
          ask:
            baseAsk +
            (Number(item.sellCharge) || 0) +
            (Number(item.sellPremium) || 0),
        };
      })
      .filter(Boolean) ?? [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const PURITY_TO_KARAT = {
    9999: "24K", // 99.99%
    999.9: "24K", // 99.99%
    999: "24K", // 99.9%
    995: "24K", // Swiss bullion / investment gold

    958: "23K", // 95.8%
    950: "23K",

    920: "22K", // Some regional jewellery standards
    916: "22K", // Standard 22K
    900: "21.6K",

    875: "21K",

    833: "20K",

    750: "18K",

    708: "17K",

    700: "16.8K",
    666: "16K",

    625: "15K",

    585: "14K", // Standard 14K
    583: "14K", // Russian standard

    500: "12K",

    417: "10K",

    375: "9K",
  };

  const getPurityLabel = (purity) => {
    return PURITY_TO_KARAT[purity] || purity;
  };
  // ❌ No data → don't render section
  if (!rows.length) return null;
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",

          py: {
            xs: "14px",
            md: "0.9vw",
          },

          px: {
            xs: "16px",
            md: "1.5vw",
          },

          alignItems: "center",

          borderRadius: {
            xs: "18px",
            md: "1.2vw",
          },

          position: "relative",
          overflow: "hidden",

          background: `
          linear-gradient(
            145deg,
            rgba(16,9,0,0.96) 0%,
            rgba(78,47,5,0.88) 50%,
            rgba(16,9,0,0.98) 100%
          )
        `,

          backdropFilter: "blur(14px)",

          boxShadow: `
          0 10px 30px rgba(0,0,0,0.45),
          inset 0 1px 0 rgba(255,239,184,0.12),
          0 0 25px rgba(255,174,31,0.12)
        `,

          margin: {
            xs: "8px 0",
            md: ".4vw 0",
          },

        }}
      >
        {/* --- LIGHT TRAIL ANIMATION LAYER --- */}
        <Box
          className="border-trail border-trail--commodity"
          sx={{
            position: "absolute",
            inset: 0,
          }}
        />
        {["COMMODITY", "UNIT", "BUY AED", "SELL AED"].map((item, i) => (
          <Typography
            key={i}
            sx={{
              position: "relative",
              zIndex: 2,
              fontSize: {
                xs: "12px",
                lg: "1vw",
                xl: "1.1vw",
              },

              fontWeight: 700,

              letterSpacing: "0.12em",

              color: "#FFE9A6",

              textAlign: i >= 2 ? "center" : "start",

              textTransform: "uppercase",
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* TABLE BODY */}
      <Box
        sx={{
          mt: "1vw",
          maxHeight: { xs: "auto", sm: "20vw" },

        }}
      >

        {rows.length === 0 ? (
          <Typography
            sx={{
              py: "3vw",
              textAlign: "center",

              color: "rgba(255,215,120,0.45)",

              fontSize: {
                xs: "14px",
                md: "1.2vw",
              },
            }}
          >
            No data available
          </Typography>
        ) : (
          <Swiper
            direction="vertical"
            slidesPerView={5}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={3000}
            style={{
              height: isMobile ? "35vw" : "20vw",

              borderRadius: "1.2vw",

              overflow: "hidden",

              backdropFilter: "blur(14px)",

              background: `
            linear-gradient(
              145deg,
              rgba(16,9,0,0.96) 0%,
              rgba(78,47,5,0.88) 50%,
              rgba(16,9,0,0.98) 100%
            )
          `,

              border: "1px solid rgba(255,204,92,0.24)",

              boxShadow: `
            0 10px 35px rgba(0,0,0,0.45),
            inset 0 1px 0 rgba(255,239,184,0.12),
            0 0 25px rgba(255,174,31,0.12)
          `,
              position: "relative",
              margin: {
                xs: "8px 0",
                md: ".4vw 0",
              },
            }}
          >
            {/* --- LIGHT TRAIL ANIMATION LAYER --- */}
            <Box
              className="border-trail border-trail--commodity"
              sx={{
                position: "absolute",
                inset: 0,
              }}
            />
            {rows.map((row, index) => (
              <SwiperSlide key={index}>
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",

                    alignItems: "center",

                    py: {
                      xs: "12px",
                      md: ".9vw",
                    },

                    px: {
                      xs: "16px",
                      md: "1.5vw",
                    },

                    height: "100%",

                    position: "relative",

                    transition: "all 0.25s ease",

                    "&:hover": {
                      background: "rgba(255, 189, 57, 0.08)",
                    },

                    "&::after": {
                      content: '""',
                      position: "absolute",

                      bottom: 0,
                      left: "5%",

                      width: "90%",
                      height: "1px",

                      background: `
                    linear-gradient(
                      to right,
                      transparent,
                      rgba(255,215,120,0.45),
                      transparent
                    )
                  `,
                    },
                  }}
                >
                  {/* METAL */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "13px",
                        sm: "12px",
                        lg: "1.15vw",
                        xl: "1.2vw",
                      },

                      fontWeight: 800,

                      color: "#FFF4CF",

                      display: "grid",
                      alignItems: "center",
                      justifyContent: "start",

                      gridTemplateColumns: "auto auto",

                      textAlign: "start",

                      lineHeight: "1",

                      gap: {
                        xs: "7px",
                        lg: "0.35vw",
                      },
                    }}
                  >
                    {row.metal_name ? row.metal_name : row.metal}

                    <Typography
                      sx={{
                        fontSize: {
                          xs: "10px",
                          sm: "10px",
                          lg: "0.95vw",
                        },

                        fontWeight: 500,

                        color: "#D9B96F",

                        letterSpacing: "0.04em",
                      }}
                    >
                      {row.purity}
                    </Typography>
                  </Typography>

                  {/* UNIT */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "13px",
                        lg: "1.05vw",
                        xl: "1.1vw",
                      },

                      color: "rgba(255,239,184,0.78)",

                      fontWeight: 500,

                      textAlign: "start",
                    }}
                  >
                    {row.unit}
                  </Typography>

                  {/* BID */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "14px",
                        lg: "1.2vw",
                        xl: "1.25vw",
                      },

                      fontWeight: 700,

                      textAlign: "center",

                      background:
                        "linear-gradient(90deg,#FFF4CF,#D9B96F,#FFFFFF)",

                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {formatPrice(row.bid)}
                  </Typography>

                  {/* ASK */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "14px",
                        lg: "1.2vw",
                        xl: "1.25vw",
                      },

                      fontWeight: 700,

                      textAlign: "center",

                      background:
                        "linear-gradient(90deg,#FFF1A8,#FFD76A,#FFF8D8)",

                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {formatPrice(row.ask)}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default CommodityTable;
