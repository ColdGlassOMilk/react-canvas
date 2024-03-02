# react-canvas

Example react component usage wrapping HTML canvas element using typescript

## Example Usage

```ts
import Canvas2D from "../../components/canvas2d";

const HelloCanvas = () => {
  const draw = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    // Draw a square
    const size = 5;
    ctx.fillStyle = "red";
    ctx.fillRect(centerX - size, centerY - size, size * 2, size * 2);
  };

  const update = (deltaTime: number) => {
    // Perform updates here (position, angle, etc.)
  };

  return (
    <Canvas2D
      draw={draw}
      update={update}
      backgroundColor="#111"
      fullscreen
    />);
};

export default HelloCanvas;

```

## Notes

Setting either `backgroundColor` or `refresh=true` will enable buffer swapping, otherwise all rendering will be static.

All props from Canvas2D will pass on to the canvas, so `width`, `height`, `style`, etc. can all be overriden. Setting `fullscreen=true` will supersede dimensions set on the component.

`draw` is a required callback that passes a `context` and `deltaTime`

`update` is an optional callback that passes `deltaTime`

## ToDo

- Handle window resize events
- Pass events to update method
