import { IPlayer, Player, createPlayer } from '../Player/Player'
import { useCanvas } from '../../hooks/useCanvas'
import { ISpell, Spell, createSpell } from '../Spell/Spell'
import { useEffect, useRef, useState } from 'react'

interface ICanvas {
  style: Record<string, string>
  openMenu: () => void
  spellColour1: string
  spellColour2: string
  spellSpeed1: number
  spellSpeed2: number
  playerSpeed1: number
  playerSpeed2: number

}

export const Canvas = (props: ICanvas) => {
  const { openMenu, spellColour1, spellColour2, spellSpeed1, spellSpeed2, playerSpeed1, playerSpeed2, ...rest } = props

  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)

  const player1 = useRef(createPlayer(100, 200, playerSpeed1, 'red')).current
  const player2 = useRef(createPlayer(window.innerWidth - 100, 200, -playerSpeed2, 'blue')).current
  const spell1 = useRef(createSpell(player1.x + player1.radius, player1.y + player1.radius, spellSpeed1, 10, spellColour1)).current
  const spell2 = useRef(createSpell(player2.x - player2.radius, player2.y - player2.radius, -spellSpeed2, -10, spellColour2)).current


  const resetPositionSpell1 = () => {
    spell1.x = player1.x + player1.radius
    spell1.y = player1.y
  }

  const resetPositionSpell2 = () => {
    spell2.x = player2.x - player2.radius
    spell2.y = player2.y
  }

  const checkDistance = (obj1X: number, obj2X: number, obj1Y: number, obj2Y: number) => {
    const dx = obj1X - obj2X
    const dy = obj1Y - obj2Y
    const distance = Math.sqrt(dx * dx + dy * dy)
    return distance
  }

  const checkCollision = (spell: ISpell, player: IPlayer) => {
    const distance = checkDistance(spell.x, player.x, spell.y, player.y)
    return distance < spell.radius + player.radius
  }

  const checkMouseOver = (evt: React.MouseEvent, player: IPlayer) => {
    const distance = checkDistance(evt.clientX, player.x, evt.clientY, player.y)
    return Math.abs(distance - player.radius) < 1
  }

  const handleMouseOver = (evt: React.MouseEvent) => {
    if (checkMouseOver(evt, player1)) player1.speedY *= -1
    if (checkMouseOver(evt, player2)) player2.speedY *= -1
  }

  const checkMouseClick = (evt: React.MouseEvent, player: IPlayer) => {
    const distance = checkDistance(evt.clientX, player.x, evt.clientY, player.y)
    return distance < player.radius
  }

  const handleClick = (evt: React.MouseEvent) => {
    if (checkMouseClick(evt, player1)) openMenu()
    if (checkMouseClick(evt, player2)) openMenu()
  }

  useEffect(() => {
    spell1.color = spellColour1
    spell2.color = spellColour2
    spell1.speedX = spellSpeed1
    spell2.speedX = -spellSpeed2
    player1.speedY = playerSpeed1
    player2.speedY = -playerSpeed2

  }, [spellColour1, spellColour2, spellSpeed1, spellSpeed2, playerSpeed1, playerSpeed2])

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

