import { OptionType } from "../../constants/SpellColours"

type TOption = {
  title: string
  value: string
}

export const Option = (props: TOption) => {
  const {title, value} = props
  return (
    <option value={value}>{title}</option>
  )
}