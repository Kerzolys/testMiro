export interface IPlayer {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  color: string;
}

export const createPlayer = (
  initialX: number,
  initialY: number,
  speedY: number,
  color: string
): IPlayer => {
  return {
    x: initialX,
    y: initialY,
    radius: 40,
    speedY: speedY,
    color: color
  };
};

export const Player = (
  context: CanvasRenderingContext2D,
  playerState: IPlayer,
  ratio: number
  // resetColor: () => void
) => {
  const update = () => {
    playerState.y += playerState.speedY * ratio;

    const isTouchingBorders = () =>
      playerState.y + playerState.radius >= context.canvas.height ||
      playerState.y - playerState.radius <= 0
        ? true
        : false;

    if (isTouchingBorders()) playerState.speedY *= -1;

    context.beginPath();
    context.arc(
      playerState.x,
      playerState.y,
      playerState.radius * ratio,
      0,
      2 * Math.PI
    );
    context.fillStyle = playerState.color
    context.fill();
    context.closePath();
  };

  update();
};
