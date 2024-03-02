# react-canvas

Example react component usage wrapping HTML canvas element using typescript

## Example Usage

```ts
import Canvas2D from "../../components/canvas2d";

const HelloCanvas = () => {
  const draw = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    // Fill the background
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const update = (deltaTime: number) => {
    // Perform updates here (position, angle, etc.)
  };

  return <Canvas2D draw={draw} update={update} fullscreen refresh />;
};

export default HelloCanvas;

```
