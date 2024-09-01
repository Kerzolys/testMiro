import { SyntheticEvent, useState } from "react";
import { DefaultSpellState, OptionType } from "../../constants/SpellColours";
import { Option } from "../Option/Option";
import styles from "./Select.module.css";

interface ISelect {
  options: OptionType[];
  onChange: (selected: OptionType) => void;
}

export const Select = (props: ISelect) => {
  const { options, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(DefaultSpellState.spellColour);
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleChange = (selectedColor: OptionType) => {
    setSelected(selectedColor);
    setIsOpen(false);
    onChange(selectedColor);
  };

  return (
    <>
      <span onClick={handleClick}>{selected.title}</span>
      <ul className={isOpen ? styles.isOpen : styles.list}>
        {isOpen &&
          options.map((option) => {
            return (
              <Option
                onChange={handleChange}
                value={option.value}
                title={option.title}
              />
            );
          })}
      </ul>
    </>
  );
};
