"use client";
export default function EyeLoader() {
  return (
    <div className="loader-root">
      <div className="loader-inner">
        <div className="loader-dot" aria-hidden />
      </div>

      <style jsx>{`
        .loader-root {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #ffffff;
        }

        .loader-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loader-dot {
          width: 16px;
          height: 16px;
          background: #15161b;
          border-radius: 50%;
          animation: pulseDot 0.9s ease-in-out infinite;
        }

        @keyframes pulseDot {
          0% {
            opacity: 0.45;
            transform: scale(0.82);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0.45;
            transform: scale(0.82);
          }
        }
      `}</style>
    </div>
  );
}
