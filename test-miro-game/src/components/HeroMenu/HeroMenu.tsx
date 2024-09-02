import { useState } from "react";
import { DefaultSpellState, OptionType, SpellColours } from "../../constants/SpellColours";
import { Select } from "../Select/Select";

import styles from './HeroMenu.module.css'

export interface IHeroMenu {
  onChange: (selectedColorValue: string) => void;
  top: string 
  left: string 
}

export const HeroMenu = ({ onChange, top, left }: IHeroMenu) => {
  const [selected, setSelected] = useState<OptionType | undefined>(
    DefaultSpellState.spellColour
  );

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (selected) onChange(selected.value);
  };

  const handleChange = (selectedColor: OptionType) => {
    setSelected(selectedColor);
  };

  return (
    <>
      <form style={{top: top, left: left}} className={styles.form} onSubmit={handleSubmit} >
        <Select onChange={handleChange} options={SpellColours} />
        <button className={styles.button} type="submit">Выбрать цвет</button>
      </form>
    </>
  );
};
