import React, { useRef, useEffect, useState, useCallback } from "react";

interface Canvas2DProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: (ctx: CanvasRenderingContext2D, deltaTime: number) => void;
  update?: (deltaTime: number) => void;
  backgroundColor?: string;
  fullscreen?: boolean;
  refresh?: boolean;
}

const Canvas2D: React.FC<Canvas2DProps> = ({
  draw,
  update,
  backgroundColor,
  fullscreen,
  refresh,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [animationId, setAnimationId] = useState<number>(0);
  const [lastTime, setLastTime] = useState<number>(0);

  const animate = useCallback(
    (time: number) => {
      if (!canvasRef.current) return;

      const deltaTime = time - lastTime;
      setLastTime(time);

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        if (backgroundColor) {
          ctx.save();
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.restore();
        } else if (refresh) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        draw(ctx, deltaTime);
      }

      if (update) update(deltaTime);
    },
    [draw, update, refresh, lastTime],
  );

  useEffect(() => {
    setAnimationId(requestAnimationFrame(animate));
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (fullscreen) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
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
