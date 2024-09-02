export interface ISpell {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
}

export const createSpell = (
  initialX: number,
  initialY: number,
  speedX: number,
  speedY: number,
  color: string
): ISpell => {
  return {
    x: initialX,
    y: initialY,
    radius: 15,
    speedX: speedX,
    speedY: speedY,
    color: color,
  };
};

export const Spell = (
  context: CanvasRenderingContext2D,
  spellState: ISpell,
  ratio: number,
  resetPosition: () => void,
) => {
  const isOutBourders = () =>
    spellState.x + spellState.radius >= context.canvas.width ||
    spellState.x + spellState.radius <= 0
      ? true
      : false;


  const update = () => {
    spellState.x += spellState.speedX * ratio;

    if (isOutBourders()) {
      resetPosition();
    }

    context.beginPath();
    context.arc(spellState.x, spellState.y, spellState.radius * ratio, 0, 2 * Math.PI);
    context.fillStyle = spellState.color;
    context.strokeStyle = '#000'
    context.lineWidth = 3
    context.stroke()
    context.fill();
    context.closePath();
  };

  update();
};
