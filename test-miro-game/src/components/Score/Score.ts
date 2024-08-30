interface IScore {
  text: string
  score: number
}

export const createScore = (initialText: string, score: number): IScore => {
  return {
    text: initialText,
  score: score = 0
  }
}

// export const Score = (context: CanvasRenderingContext2D, scoreState: IScore) => {

// }