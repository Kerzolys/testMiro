import { OptionType } from "../../constants/SpellColours";
import styles from "./Option.module.css";

type TOption = {
  title: string;
  value: string;
  onChange: ({ title, value }: OptionType) => void;
};

export const Option = (props: TOption) => {
  const { value, title, onChange } = props;

  const handleClick = () => {
    onChange({ title, value });
  };
  return (
    <li onClick={handleClick} className={styles.item} data-value={value}>
      {title}
    </li>
  );
};
