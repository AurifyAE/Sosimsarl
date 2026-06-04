import React, { useEffect, useState } from "react";

const ErrorPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <style>{`
        .ep-root {
          min-height: 100dvh;
          background:
            radial-gradient(circle at 70% 35%, rgba(176, 105, 0, 0.24), transparent 42%),
            #090500;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
          padding: 40px 24px;
        }

        /* Ambient light blobs */
        .ep-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 1.2s ease;
        }
        .ep-blob--1 {
          width: 520px; height: 420px;
          top: -120px; left: -100px;
          background: radial-gradient(circle, #8a540c 0%, transparent 70%);
        }
        .ep-blob--2 {
          width: 400px; height: 380px;
          bottom: -80px; right: -60px;
          background: radial-gradient(circle, #6f4106 0%, transparent 70%);
        }
        .ep-blob--3 {
          width: 260px; height: 260px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, #d99b3026 0%, transparent 70%);
        }
        .ep-mounted .ep-blob { opacity: 1; }

        /* Fine dot grid */
        .ep-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #ffd36f12 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        /* Animated ring decorations */
        .ep-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid #ffffff08;
          pointer-events: none;
          animation: ep-spin 30s linear infinite;
        }
        .ep-ring--1 { width: 600px; height: 600px; border-color: #ffffff06; animation-duration: 40s; }
        .ep-ring--2 { width: 800px; height: 800px; border-color: #ffffff04; animation-duration: 60s; animation-direction: reverse; }
        @keyframes ep-spin { to { transform: rotate(360deg); } }

        /* Card container */
        .ep-card {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          max-width: 560px;
          width: 100%;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        .ep-mounted .ep-card {
          opacity: 1;
          transform: translateY(0);
        }

        /* Icon illustration area */
        .ep-icon-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Ping animation for the icon glow */
        .ep-icon-glow {
          position: absolute;
          inset: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, #ffbd391f 0%, transparent 70%);
          animation: ep-pulse 3s ease-in-out infinite;
        }
        @keyframes ep-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }

        /* Logo */
        .ep-logo {
          display: block;
          height: 48px;
          width: auto;
          opacity: 0.7;
          filter: brightness(0) invert(1);
          margin-bottom: 4px;
        }

        /* Divider */
        .ep-divider {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, transparent, #ffd36f2a, transparent);
        }

        /* Text content */
        .ep-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ep-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #3b2608;
          border: 1px solid #d6a64a45;
          color: #f5cf7b;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin: 0 auto;
        }
        .ep-badge-dot {
          width: 6px;
          height: 6px;
          background: #ffd76a;
          border-radius: 50%;
          animation: ep-blink 2s ease-in-out infinite;
        }
        @keyframes ep-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .ep-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(26px, 5vw, 42px);
          font-weight: 800;
          line-height: 1.1;
          color: #fff4cf;
          letter-spacing: -0.02em;
        }
        .ep-heading em {
          font-style: normal;
          color: #ffd76a;
        }

        .ep-sub {
          font-size: 15px;
          font-weight: 300;
          color: #c7a66b;
          line-height: 1.65;
          max-width: 400px;
          margin: 0 auto;
        }

        /* Device icons row */
        .ep-devices {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          justify-content: center;
          margin-top: 4px;
        }

        .ep-device {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.7;
        }
        .ep-device-label {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #d9b96f;
          opacity: 0.7;
        }

        /* Action row */
        .ep-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .ep-hint {
          font-size: 13px;
          color: #9f7a3a;
        }

        /* Bottom fade line */
        .ep-line {
          width: 160px;
          height: 1px;
          background: linear-gradient(to right, transparent, #ffbd3945, transparent);
          margin-top: 8px;
        }
      `}</style>

      <div className={`ep-root${mounted ? " ep-mounted" : ""}`}>
        {/* Background layers */}
        <div className="ep-grid" />
        <div className="ep-blob ep-blob--1" />
        <div className="ep-blob ep-blob--2" />
        <div className="ep-blob ep-blob--3" />
        <div className="ep-ring ep-ring--1" style={{ position: "absolute" }} />
        <div className="ep-ring ep-ring--2" style={{ position: "absolute" }} />
        <div className="ep-card">
          {/* Logo */}
          <img src="/images/logo.svg" alt="Logo" className="ep-logo" />


          {/* Devices illustration */}
          <div className="ep-icon-wrap">
            <div className="ep-icon-glow" />
            <DevicesIllustration />
          </div>

          {/* Content */}
          <div className="ep-content">
            <div className="ep-badge">
              <span className="ep-badge-dot" />
              Access Restricted
            </div>

            <h1 className="ep-heading">
              Available on <em>Desktop</em><br />& TV only
            </h1>

            <p className="ep-sub">
              This experience is optimised for larger screens. Please switch to a desktop computer or TV to continue.
            </p>
          </div>

          {/* Device labels */}
          <div className="ep-devices">
            <div className="ep-device">
              <svg width="64" height="44" viewBox="0 0 64 44" fill="none">
                <rect x="1" y="1" width="62" height="38" rx="4" stroke="#ffd76a" strokeWidth="1.5" fill="#1f1303" />
                <rect x="8" y="8" width="48" height="26" rx="2" fill="#332006" />
                <rect x="22" y="39" width="20" height="4" fill="#65400b" />
                <rect x="16" y="43" width="32" height="1" rx="0.5" fill="#8a5a12" />
              </svg>
              <span className="ep-device-label">Desktop</span>
            </div>

            <div style={{ width: 1, height: 48, background: "#ffffff08", alignSelf: "center" }} />

            <div className="ep-device">
              <svg width="80" height="56" viewBox="0 0 80 56" fill="none">
                <rect x="1" y="1" width="78" height="46" rx="4" stroke="#ffd76a" strokeWidth="1.5" fill="#1f1303" />
                <rect x="6" y="6" width="68" height="36" rx="2" fill="#332006" />
                <rect x="30" y="47" width="20" height="4" fill="#65400b" />
                <rect x="24" y="51" width="32" height="4" rx="2" fill="#8a5a12" />
              </svg>
              <span className="ep-device-label">TV</span>
            </div>
          </div>

          <div className="ep-actions">
            <span className="ep-hint">Detected: Mobile / Tablet</span>
            <div className="ep-line" />
          </div>
        </div>
      </div>
    </>
  );
};

function DevicesIllustration() {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow effect behind screens */}
      <ellipse cx="110" cy="95" rx="90" ry="28" fill="#9b650f" opacity="0.35" />

      {/* Monitor */}
      <rect x="34" y="10" width="152" height="96" rx="8" fill="#1f1303" stroke="#b88624" strokeWidth="1.5" />
      <rect x="42" y="18" width="136" height="80" rx="4" fill="#2a1a05" />

      {/* Screen content shimmer lines */}
      <rect x="54" y="30" width="80" height="6" rx="3" fill="#d6a64a" opacity="0.8" />
      <rect x="54" y="44" width="56" height="4" rx="2" fill="#a77722" opacity="0.6" />
      <rect x="54" y="54" width="96" height="4" rx="2" fill="#a77722" opacity="0.4" />
      <rect x="54" y="64" width="72" height="4" rx="2" fill="#a77722" opacity="0.35" />
      <rect x="54" y="74" width="40" height="4" rx="2" fill="#a77722" opacity="0.25" />

      {/* Screen glow dot */}
      <circle cx="150" cy="50" r="18" fill="#b88624" opacity="0.4" />
      <circle cx="150" cy="50" r="10" fill="#ffd76a" opacity="0.5" />

      {/* Stand */}
      <rect x="98" y="106" width="24" height="14" rx="2" fill="#5f3b08" />
      <rect x="84" y="120" width="52" height="6" rx="3" fill="#8a5a12" />

      {/* Crossed-out phone (subtle overlay) */}
      <rect x="172" y="70" width="32" height="50" rx="4" fill="#1f1303" stroke="#8a5a12" strokeWidth="1" opacity="0.7" />
      <line x1="168" y1="66" x2="208" y2="124" stroke="#e05555" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="208" y1="66" x2="168" y2="124" stroke="#e05555" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default ErrorPage;
