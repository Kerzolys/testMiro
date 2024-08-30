import { useEffect, useRef } from "react";

export const useCanvas = (
  draw: (context: CanvasRenderingContext2D,ratio: number) => void,
  
) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const baseHeight = 720;
    let animationId: number;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ratio = canvas.height / baseHeight;
      // console.log(canvas.width)
      // console.log(ratio)
      const context = canvas.getContext("2d");
      if (context) {
        const render = () => {
          draw(context,ratio);
          animationId = window.requestAnimationFrame(render);
        };
        render();
      }
    }
    return () => window.cancelAnimationFrame(animationId);
  }, []);

  return canvasRef;
};
