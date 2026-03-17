"use client";
import { useEffect, useState } from "react";

export default function EyeLoader() {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="eyes">
        <div className={`eye ${blink ? "blink" : ""}`}>
          <div className="pupil" />
        </div>
        <div className={`eye ${blink ? "blink" : ""}`}>
          <div className="pupil" />
        </div>
      </div>

      <style jsx>{`
        .container {
          position: fixed;
          inset: 0;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .eyes {
          display: flex;
          gap: 40px;
        }

        .eye {
          width: 90px;
          height: 90px;
          background: #000;
          border-radius: 28px; /* rounded-square like your image */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transform-origin: center;
        }

        .pupil {
          width: 28px;
          height: 28px;
          background: #fff;
          border-radius: 50%;
        }

        /* Blink animation */
        .blink {
          animation: blinkAnim 0.18s ease-in-out;
        }

        @keyframes blinkAnim {
          0% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.1);
          }
          100% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}