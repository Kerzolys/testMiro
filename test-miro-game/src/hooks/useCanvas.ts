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
      const ratio = canvas.height / baseHeight;
      canvas.width = window.innerWidth - (10 * ratio);
      canvas.height = window.innerHeight - (200 * ratio);
      const context = canvas.getContext("2d");
      console.log(window)
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
