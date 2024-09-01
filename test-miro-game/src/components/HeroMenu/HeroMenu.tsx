import { useState } from "react";
import { DefaultSpellState, OptionType, SpellColours } from "../../constants/SpellColours";
import { Select } from "../Select/Select";

import styles from './HeroMenu.module.css'

export interface IHeroMenu {
  isOpen: boolean
  onChange: (selectedColorValue: string) => void;
}

export const HeroMenu = ({ isOpen, onChange }: IHeroMenu) => {
  const [selected, setSelected] = useState<OptionType | undefined>(
    DefaultSpellState.spellColour
  );

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (selected) onChange(selected.value);
    console.log(selected);
  };

  const handleChange = (selectedColor: OptionType) => {
    setSelected(selectedColor);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={isOpen ? styles.isOpen : styles.container}>
        <Select onChange={handleChange} options={SpellColours} />
        <button type="submit">Выбрать цвет</button>
      </form>
    </>
  );
};
