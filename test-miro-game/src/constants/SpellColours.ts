export type OptionType = {
  title: string;
  value: string;
};

export const SpellColours: OptionType[] = [
  { title: "Зеленый", value: "green" },
  { title: "Красный", value: "red" },
  { title: "Черный", value: "black" },
  { title: "Серый", value: "grey" },
  { title: "Розовый", value: "pink" },
  { title: "Золотой", value: "gold" },
  { title: "Желтый", value: "yellow" },
  { title: "Золотой", value: "gold" },
];

export const DefaultSpellState = {
  spellColour: SpellColours[0]
}
