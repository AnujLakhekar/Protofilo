"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { cn } from "@/lib/utils"

interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number
  gridGap?: number
  flickerChance?: number
  color?: string
  width?: number
  height?: number
  className?: string
  maxOpacity?: number
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  width,
  height,
  className,
  maxOpacity = 0.3,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })
  const [resolvedColor, setResolvedColor] = useState<string>("rgb(0, 0, 0)")

  const resolveColor = useCallback((colorValue: string | undefined): string => {
    if (typeof window === "undefined") {
      return "rgb(0, 0, 0)"
    }

    const colorToResolve = colorValue || "var(--foreground)"

    if (colorToResolve.startsWith("var(")) {
      const tempEl = document.createElement("div")
      tempEl.style.color = colorToResolve
      tempEl.style.position = "absolute"
      tempEl.style.visibility = "hidden"
      document.body.appendChild(tempEl)
      const computedColor = window.getComputedStyle(tempEl).color
      document.body.removeChild(tempEl)
      return computedColor || "rgb(0, 0, 0)"
    }

    return colorToResolve
  }, [])

  useEffect(() => {
    const updateColor = () => {
      const resolved = resolveColor(color)
      setResolvedColor(resolved)
    }

    updateColor()

    const observer = new MutationObserver(() => {
      updateColor()
    })

    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [color, resolveColor])

  const memoizedColor = useMemo(() => {
    const toRGBA = (colorValue: string) => {
      if (typeof window === "undefined") {
        return `rgba(0, 0, 0,`
      }
      const canvas = document.createElement("canvas")
      canvas.width = canvas.height = 1
      const ctx = canvas.getContext("2d")
      if (!ctx) return "rgba(255, 0, 0,"
      ctx.fillStyle = colorValue
      ctx.fillRect(0, 0, 1, 1)
      const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
      return `rgba(${r}, ${g}, ${b},`
    }
    return toRGBA(resolvedColor)
  }, [resolvedColor])

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const cols = Math.floor(width / (squareSize + gridGap))
      const rows = Math.floor(height / (squareSize + gridGap))

      const squares = new Float32Array(cols * rows)
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      return { width, height, cols, rows, squares, dpr }
    },
    [squareSize, gridGap, maxOpacity]
  )

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity
        }
      }
    },
    [flickerChance, maxOpacity]
  )

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "transparent"
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j]
          ctx.fillStyle = `${memoizedColor}${opacity})`
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          )
        }
      }
    },
    [memoizedColor, squareSize, gridGap]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let gridParams: ReturnType<typeof setupCanvas>
    let lastFrameTime = 0
    const frameInterval = 1000 / 24

    const updateCanvasSize = () => {
      const newWidth = width || container.clientWidth
      const newHeight = height || container.clientHeight
      setCanvasSize({ width: newWidth, height: newHeight })
      gridParams = setupCanvas(canvas, newWidth, newHeight)
    }

    updateCanvasSize()

    const animate = (time: number) => {
      if (!isInView || document.visibilityState === "hidden") return

      if (time - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      const deltaTime = (time - lastFrameTime) / 1000
      lastFrameTime = time

      updateSquares(gridParams.squares, deltaTime)
      drawGrid(
        ctx,
        gridParams.width,
        gridParams.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        gridParams.dpr
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    intersectionObserver.observe(canvas)

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isInView) {
        lastFrameTime = performance.now()
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    if (isInView) {
      lastFrameTime = performance.now()
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

  return (
    <div
      ref={containerRef}
      className={cn(`h-full w-full ${className}`)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  )
}
