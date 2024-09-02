import { useEffect, useRef } from "react";

export const useCanvas = (
  draw: (context: CanvasRenderingContext2D, ratio: number) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const baseHeight = 720;
    let animationId: number;
    if (canvas) {
      // const ratio = canvas.height / baseHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = (window.innerWidth - 10) * dpr;
      canvas.height = (window.innerHeight - 200) * dpr;

      canvas.style.width = canvas.width + "px";
      canvas.style.height = canvas.height + "px";

      const context = canvas.getContext("2d");
      console.log(
        `Canvas width: ${canvas.width}, Canvas height: ${canvas.height}`
      );
      console.log(
        `Window innerWidth: ${window.innerWidth}, innerHeight: ${window.innerHeight}`
      );
      console.log(`Device Pixel Ratio: ${window.devicePixelRatio}`);
      if (context) {
        context.scale(dpr, dpr);
        const ratio = canvas.height / (baseHeight * dpr);

        const render = () => {
          draw(context, ratio);
          animationId = window.requestAnimationFrame(render);
        };
        render();
      }
    }
    return () => window.cancelAnimationFrame(animationId);
  }, []);

  return canvasRef;
};
