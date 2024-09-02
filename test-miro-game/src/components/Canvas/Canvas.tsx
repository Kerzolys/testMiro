import { IPlayer, Player, createPlayer } from '../Player/Player'
import { useCanvas } from '../../hooks/useCanvas'
import { ISpell, Spell, createSpell } from '../Spell/Spell'
import React, { useEffect, useRef } from 'react'


interface ICanvas {
  style: Record<string, string>
  spellColor1: string
  spellColor2: string
  spellSpeed1: number
  spellSpeed2: number
  playerSpeed1: number
  playerSpeed2: number
  openMenu: (top: string, left: string, player: number) => void
  onChangeScore1: () => void
  onChangeScore2: () => void
}

export const Canvas = (props: ICanvas) => {
  const { spellColor1, spellColor2, spellSpeed1, spellSpeed2, playerSpeed1, playerSpeed2, openMenu, onChangeScore1, onChangeScore2, ...rest } = props

  const player1 = useRef(createPlayer(100, 200, playerSpeed1, 'gold')).current
  const player2 = useRef(createPlayer(window.innerWidth - 100, 200, -playerSpeed2, 'blue')).current
  const spell1 = useRef(createSpell(player1.x + player1.radius, player1.y + player1.radius, spellSpeed1, 10, spellColor1)).current
  const spell2 = useRef(createSpell(player2.x - player2.radius, player2.y - player2.radius, -spellSpeed2, -10, spellColor2)).current


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

  const handleCollision = (player: IPlayer, originalColor: string) => {
    player.color = 'red'
    setTimeout(() => {
      player.color = originalColor
    }, 70)
  }

  const checkCollision = (spell: ISpell, player: IPlayer, originalColor: string) => {
    const distance = checkDistance(spell.x, player.x, spell.y, player.y)

    if (distance < spell.radius + player.radius) {
      handleCollision(player, originalColor)
      return true
    }
    return false
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
    if (checkMouseClick(evt, player1)) {
      const newMenuPosition = { top: `${evt.clientY}px`, left: `${evt.clientX * 1.3}px` }
      openMenu(newMenuPosition.top, newMenuPosition.left, 1)
    }
    if (checkMouseClick(evt, player2)) {
      const newMenuPosition = { top: `${evt.clientY}px`, left: `${evt.clientX * .88}px` }
      openMenu(newMenuPosition.top, newMenuPosition.left, 2)
    }
  }

  useEffect(() => {
    spell1.color = spellColor1
    spell2.color = spellColor2
    spell1.speedX = spellSpeed1
    spell2.speedX = -spellSpeed2
    player1.speedY = playerSpeed1
    player2.speedY = -playerSpeed2

  }, [spellColor1, spellColor2, spellSpeed1, spellSpeed2, playerSpeed1, playerSpeed2])

  const canvasRef = useCanvas((context: CanvasRenderingContext2D, ratio: number) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    player1.x = 100 * ratio
    player2.x = window.innerWidth - (100 * ratio)

    Player(context, player1, ratio)
    Player(context, player2, ratio)
    Spell(context, spell1, ratio, resetPositionSpell1)
    Spell(context, spell2, ratio, resetPositionSpell2)

    if (checkCollision(spell1, player2, 'blue')) {
      resetPositionSpell1()
      onChangeScore1()
    }
    if (checkCollision(spell2, player1, 'gold')) {
      resetPositionSpell2()
      onChangeScore2()
    }
  })

  return (
    <div>
      <canvas ref={canvasRef} {...rest} onMouseMove={handleMouseOver} onClick={handleClick} />
    </div>
  )
}

