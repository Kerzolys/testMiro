import { useEffect, useState } from 'react';
import { Canvas } from '../components/Canvas/Canvas';
import { HeroMenu } from '../components/HeroMenu/HeroMenu';
import { DefaultSpellState, OptionType, SpellColours } from '../constants/SpellColours';
import { SpeedRange } from '../components/SpellSpeedRange/SpeedRange';

import styles from './App.module.css';
import { Modal } from '../components/Modal/Modal';

function App() {
  const [activePlayer, setActivePlayer] = useState<number | null>(null)
  const [color1, setColor1] = useState(DefaultSpellState.spellColour.value);
  const [color2, setColor2] = useState(DefaultSpellState.spellColour.value);
  const [spellSpeed1, setSpellSpeed1] = useState(1)
  const [spellSpeed2, setSpellSpeed2] = useState(1)
  const [playerSpeed1, setPlayerSpeed1] = useState(1)
  const [playerSpeed2, setPlayerSpeed2] = useState(1)
  const [playerMenu1, setPlayerMenu1] = useState<Record<string, string>>({ top: '0', left: '0' })
  const [playerMenu2, setPlayerMenu2] = useState<Record<string, string>>({ top: '0', left: '0' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMenu = (top: string, left: string, player: number) => {
    setActivePlayer(player)
    setIsModalOpen(prev => !prev)
    player === 1 ? setPlayerMenu1({ top, left }) : setPlayerMenu2({ top, left })
  }

  const handleChangeSpellColor = (newColor: OptionType['value'], player: number) => {
    if (player === 1) setColor1(newColor);
    else setColor2(newColor);
    closeModal()
  }

  const handleChangeSpellSpeed = (newSpeed: number, player: number) => {
    if (player === 1) setSpellSpeed1(newSpeed);
    else setSpellSpeed2(newSpeed);
  }

  const handleChangePlayerSpeed = (newSpeed: number, player: number) => {
    if (player === 1) setPlayerSpeed1(newSpeed);
    else setPlayerSpeed2(newSpeed);
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setColor1(color1)
    setColor2(color2)

    const closeModalEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', closeModalEscape)

    return () => window.removeEventListener('keydown', closeModalEscape)
  }, [color1, color2])

  return (
    <div className={styles.App}>
      <Canvas
        openMenu={(top, left, player) => handleMenu(top, left, player)}
        style={{ border: '1px solid #000', borderRadius: '10px', backgroundColor: '#CAE5B3' }}
        spellColor1={color1}
        spellColor2={color2}
        spellSpeed1={spellSpeed1}
        spellSpeed2={spellSpeed2}
        playerSpeed1={playerSpeed1}
        playerSpeed2={playerSpeed2}
      />
      <div className={styles.oprtionsBlock}>
        <div className={styles.heroBlock}>
          <SpeedRange min={1} max={20} value={spellSpeed1} title='Скорость заклинания: ' onChange={(newSpeed) => handleChangeSpellSpeed(newSpeed, 1)} />
          <SpeedRange min={1} max={10} value={playerSpeed1} title='Скорость героя: ' onChange={(newSpeed) => handleChangePlayerSpeed(newSpeed, 1)} />
        </div>
        <Modal onClose={closeModal} isOpen={isModalOpen}>
          {activePlayer === 1 && <HeroMenu top={playerMenu1.top} left={playerMenu1.left} onChange={(newColor) => handleChangeSpellColor(newColor, 1)} />}
          {activePlayer === 2 && <HeroMenu top={playerMenu2.top} left={playerMenu2.left} onChange={(newColor) => handleChangeSpellColor(newColor, 2)} />}
        </Modal>
        <div className={styles.heroBlock}>
          <SpeedRange min={1} max={20} value={spellSpeed2} title='Скорость заклинания: ' onChange={(newSpeed) => handleChangeSpellSpeed(newSpeed, 2)} />
          <SpeedRange min={1} max={10} value={playerSpeed2} title='Скорость героя: ' onChange={(newSpeed) => handleChangePlayerSpeed(newSpeed, 2)} />
        </div>
      </div>
    </div>
  );
}

export default App;
