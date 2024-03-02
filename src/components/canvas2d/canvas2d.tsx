import React, { useRef, useEffect, useState, useCallback } from "react";

interface Canvas2DProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: (ctx: CanvasRenderingContext2D, deltaTime: number) => void;
  update?: (ctx: CanvasRenderingContext2D, deltaTime: number) => void;
  backgroundColor?: string;
  targetFrameRate?: number;
  fullscreen?: boolean;
  refresh?: boolean;
}

const Canvas2D: React.FC<Canvas2DProps> = ({
  draw,
  update,
  backgroundColor,
  targetFrameRate,
  fullscreen,
  refresh,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastRenderTimeRef = useRef<number>(performance.now());
  const lastUpdateTimeRef = useRef<number>(performance.now());

  const render = useCallback(() => {
    if (!canvasRef.current) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - lastRenderTimeRef.current;
    lastRenderTimeRef.current = currentTime;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (backgroundColor) {
      ctx.save();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.restore();
    } else if (refresh) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    draw(ctx, deltaTime);
  }, [draw, backgroundColor, refresh]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      render();
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [render]);

  useEffect(() => {
    if (!update) return;

    const updateLoop = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTimeRef.current;
      lastUpdateTimeRef.current = currentTime;

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      update(ctx, deltaTime);

      setTimeout(updateLoop, 1000 / (targetFrameRate || 60));
    };

    updateLoop();

    return () => {}; // No cleanup needed for setTimeout
  }, [update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      if (fullscreen) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [fullscreen]);

  return (
    <canvas
      ref={canvasRef}
      {...props}
      style={{
        backgroundColor: "magenta",
        position: fullscreen ? "fixed" : undefined,
      }}
    ></canvas>
  );
};

export default Canvas2D;
