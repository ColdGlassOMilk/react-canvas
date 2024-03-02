import Canvas2D from "../../components/canvas2d";

const HelloCanvas = () => {
  let angle = 0; // Initial angle
  const angularSpeed = Math.PI / 2; // radians per second

  const draw = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    // Calculate the position of the circle
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = Math.floor(centerX / 10);
    const positionX = centerX + radius * Math.cos(angle);
    const positionY = centerY + radius * Math.sin(angle);

    // Draw a circle at the calculated position
    ctx.fillStyle = "aqua";
    ctx.shadowBlur = radius;
    ctx.shadowColor = "aqua";
    ctx.beginPath();
    ctx.ellipse(
      positionX - radius / 2,
      positionY - radius / 2,
      radius / 2,
      radius / 2,
      angle,
      0,
      360,
    );
    ctx.fill();
    ctx.closePath();
  };

  const update = (deltaTime: number) => {
    angle += angularSpeed * (deltaTime / 1000);
  };

  return (
    <Canvas2D draw={draw} update={update} backgroundColor="#111" fullscreen />
  );
};

export default HelloCanvas;
