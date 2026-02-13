"use client";

import { useRef, useEffect } from "react";

/* ===================== TYPES ===================== */

type RGB = {
    r: number;
    g: number;
    b: number;
};

type Letter = {
    char: string;
    color: string;
    targetColor: string;
    colorProgress: number;
};

type LetterGlitchProps = {
    glitchColors?: string[];
    className?: string;
    glitchSpeed?: number;
    centerVignette?: boolean;
    outerVignette?: boolean;
    smooth?: boolean;
    characters?: string;
};

/* ===================== COMPONENT ===================== */

const LetterGlitch = ({
                          glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
                          className = "",
                          glitchSpeed = 50,
                          centerVignette = false,
                          outerVignette = true,
                          smooth = true,
                          characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
                      }: LetterGlitchProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const letters = useRef<Letter[]>([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const lastGlitchTime = useRef<number>(Date.now());

    const lettersAndSymbols = Array.from(characters);

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    /* ===================== HELPERS ===================== */

    const getRandomChar = (): string =>
        lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];

    const getRandomColor = (): string =>
        glitchColors[Math.floor(Math.random() * glitchColors.length)];

    const hexToRgb = (hex: string): RGB | null => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

        const normalizedHex = hex.replace(
            shorthandRegex,
            (_m, r, g, b) => r + r + g + g + b + b
        );

        const result =
            /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);

        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    };

    const interpolateColor = (
        start: RGB,
        end: RGB,
        factor: number
    ): string => {
        return `rgb(
      ${Math.round(start.r + (end.r - start.r) * factor)},
      ${Math.round(start.g + (end.g - start.g) * factor)},
      ${Math.round(start.b + (end.b - start.b) * factor)}
    )`;
    };

    const calculateGrid = (width: number, height: number) => ({
        columns: Math.ceil(width / charWidth),
        rows: Math.ceil(height / charHeight),
    });

    const initializeLetters = (columns: number, rows: number) => {
        grid.current = { columns, rows };
        const totalLetters = columns * rows;

        letters.current = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1,
        }));
    };

    /* ===================== CANVAS ===================== */

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas || !canvas.parentElement) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        context.current?.setTransform(dpr, 0, 0, dpr, 0, 0);

        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);
        drawLetters();
    };

    const drawLetters = () => {
        if (!context.current || !canvasRef.current) return;

        const ctx = context.current;
        const { width, height } = canvasRef.current.getBoundingClientRect();

        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = "top";

        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const updateLetters = () => {
        const updateCount = Math.max(
            1,
            Math.floor(letters.current.length * 0.05)
        );

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.current.length);
            const letter = letters.current[index];
            if (!letter) continue;

            letter.char = getRandomChar();
            letter.targetColor = getRandomColor();
            letter.colorProgress = smooth ? 0 : 1;
            if (!smooth) letter.color = letter.targetColor;
        }
    };

    const handleSmoothTransitions = () => {
        let needsRedraw = false;

        letters.current.forEach(letter => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05;

                const start = hexToRgb(letter.color);
                const end = hexToRgb(letter.targetColor);

                if (start && end) {
                    letter.color = interpolateColor(start, end, letter.colorProgress);
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) drawLetters();
    };

    const animate = () => {
        const now = Date.now();

        if (now - lastGlitchTime.current >= glitchSpeed) {
            updateLetters();
            drawLetters();
            lastGlitchTime.current = now;
        }

        if (smooth) handleSmoothTransitions();

        animationRef.current = requestAnimationFrame(animate);
    };

    /* ===================== EFFECT ===================== */

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        context.current = canvas.getContext("2d");
        resizeCanvas();
        animate();

        const handleResize = () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            resizeCanvas();
            animate();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            window.removeEventListener("resize", handleResize);
        };
    }, [glitchSpeed, smooth]);

    /* ===================== STYLES ===================== */

    const containerStyle: React.CSSProperties = {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        overflow: "hidden",
    };

    const canvasStyle: React.CSSProperties = {
        display: "block",
        width: "100%",
        height: "100%",
    };

    return (
        <div style={containerStyle} className={className}>
            <canvas ref={canvasRef} style={canvasStyle} />
            {outerVignette && <div style={outerVignetteStyle} />}
            {centerVignette && <div style={centerVignetteStyle} />}
        </div>
    );
};

/* ===================== VIGNETTES ===================== */

const outerVignetteStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
        "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
};

const centerVignetteStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
        "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
};

export default LetterGlitch;
