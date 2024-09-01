import { useEffect, useState } from 'react';
import './App.css';
import { Canvas } from './components/Canvas/Canvas';
import { HeroMenu } from './components/HeroMenu/HeroMenu';
import { DefaultSpellState, OptionType, SpellColours } from './constants/SpellColours';
import { Range } from './components/SpellSpeedRange/Range';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [color1, setColor1] = useState(DefaultSpellState.spellColour.value);
  const [color2, setColor2] = useState(DefaultSpellState.spellColour.value);
  const [spellSpeed1, setSpellSpeed1] = useState(1)
  const [spellSpeed2, setSpellSpeed2] = useState(1)
  const [playerSpeed1, setPlayerSpeed1] = useState(1)
  const [playerSpeed2, setPlayerSpeed2] = useState(1)

  const handleMenu = () => {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    setColor1(color1)
    setColor2(color2)
  }, [color1, color2])

  const handleChangeSpellColour = (newColor: OptionType['value'], player: number) => {
    if (player === 1) setColor1(newColor);
    else setColor2(newColor);
  }

  const handleChangeSpellSpeed = (newSpeed: number, player: number) => {
    if (player === 1) setSpellSpeed1(newSpeed);
    else setSpellSpeed2(newSpeed);
  }

  const handleChangePlayerSpeed = (newSpeed: number, player: number) => {
    if (player === 1) setPlayerSpeed1(newSpeed);
    else setPlayerSpeed2(newSpeed);
  }

  return (
    <div className="App">
      <Canvas
        openMenu={handleMenu}
        style={{ border: '1px solid #000' }}
        spellColour1={color1}
        spellColour2={color2}
        spellSpeed1={spellSpeed1}
        spellSpeed2={spellSpeed2}
        playerSpeed1={playerSpeed1}
        playerSpeed2={playerSpeed2}
      />
      {isOpen && <HeroMenu isOpen={isOpen} onChange={(newColor) => handleChangeSpellColour(newColor, 1)} />}
      {isOpen && <HeroMenu isOpen={isOpen} onChange={(newColor) => handleChangeSpellColour(newColor, 2)} />}
      <Range min={1} max={10} value={spellSpeed1} onChange={(newSpeed) => handleChangePlayerSpeed(newSpeed, 1)} />
      <Range min={1} max={20} value={playerSpeed1} onChange={(newSpeed) => handleChangeSpellSpeed(newSpeed, 1)} />
      <Range min={1} max={10} value={spellSpeed2} onChange={(newSpeed) => handleChangePlayerSpeed(newSpeed, 2)} />
      <Range min={1} max={20} value={playerSpeed2} onChange={(newSpeed) => handleChangeSpellSpeed(newSpeed, 2)} />
    </div>
  );
}

export default App;
