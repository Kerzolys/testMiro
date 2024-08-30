import { useEffect, useState } from 'react';
import './App.css';
import { Canvas } from './components/Canvas/Canvas';
import { HeroMenu } from './components/HeroMenu/HeroMenu';
import { DefaultSpellState, OptionType, SpellColours } from './constants/SpellColours';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<OptionType>(DefaultSpellState.spellColour)


  const handleMenu = () => {
    setIsOpen(prev => !prev)
  }

  useEffect(() => {
    setSelected(selected)
  }, [selected])


  return (
    <div className="App">
      <Canvas openMenu={handleMenu} style={{ border: '1px solid #000' }} spellColour={selected.value}/>
      <HeroMenu isOpen={isOpen} options={SpellColours} isSelected={selected} />
    </div>
  );
}

export default App;
