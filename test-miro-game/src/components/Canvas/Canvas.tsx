import { IPlayer, Player, createPlayer } from '../Player/Player'
import { useCanvas } from '../../hooks/useCanvas'
import { ISpell, Spell, createSpell } from '../Spell/Spell'
import { useRef, useState } from 'react'

interface ICanvas {
  style: Record<string, string>
  openMenu: () => void
  spellColour: string
}

export const Canvas = (props: ICanvas) => {
  const { openMenu, spellColour, ...rest } = props

  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)





  const player1 = useRef(createPlayer(100, 200, 1, 'red')).current
  const player2 = useRef(createPlayer(window.innerWidth - 100, 200, -1, 'blue')).current
  const spell1 = useRef(createSpell(player1.x + player1.radius, player1.y + player1.radius, 10, 10, spellColour)).current
  const spell2 = useRef(createSpell(player2.x - player2.radius, player2.y - player2.radius, -10, -10, spellColour)).current


  const resetPositionSpell1 = () => {
    spell1.x = player1.x + player1.radius
    spell1.y = player1.y
  }

  const resetPositionSpell2 = () => {
    spell2.x = player2.x - player2.radius
    spell2.y = player2.y
  }

  const checkCollision = (spell: ISpell, player: IPlayer) => {
    const dx = spell.x - player.x
    const dy = spell.y - player.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < spell.radius + player.radius
  }

  const checkMouseOver = (evt: React.MouseEvent, player: IPlayer) => {
    const dx = evt.clientX - player.x
    const dy = evt.clientY - player.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance < player.radius
  }

  const handleMouseOver = (evt: React.MouseEvent) => {
    if (checkMouseOver(evt, player1)) player1.speedY *= -1
    if (checkMouseOver(evt, player2)) player2.speedY *= -1
  }

  const handleClick = (evt: React.MouseEvent) => {
    if (checkMouseOver(evt, player1)) openMenu()
    if (checkMouseOver(evt, player2)) openMenu()
  }

  const canvasRef = useCanvas((context: CanvasRenderingContext2D, ratio: number) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    player1.x = 100 * ratio
    player2.x = window.innerWidth - (100 * ratio)

    Player(context, player1, ratio)
    Player(context, player2, ratio)
    Spell(context, spell1, ratio, resetPositionSpell1)
    Spell(context, spell2, ratio, resetPositionSpell2)

    if (checkCollision(spell1, player2)) {
      resetPositionSpell1()
      setScore1((prevScore) => prevScore + 1)
    }
    if (checkCollision(spell2, player1)) {
      resetPositionSpell2()
      setScore2((prevScore) => prevScore + 1)
    }
  })

  return (
    <div>
      <canvas ref={canvasRef} {...rest} onMouseMove={handleMouseOver} onClick={handleClick} />
      <h2>Player 1: {score1}</h2>
      <h2>Player 2: {score2}</h2>
    </div>
  )
}

