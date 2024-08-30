import classNames from "classnames"
import { OptionType } from "../../constants/SpellColours"
import { Option } from "../Option/Option"

import styles from './HeroMenu.module.css'

type THeroMenu = {
  isOpen: boolean
  options: OptionType[]
  isSelected: OptionType
}

export const HeroMenu = (props:THeroMenu) => {
  const {isOpen, options} = props
  return (
    <div className={isOpen ? styles.isOpen : styles.container}>
      <select>
        {options.map(option => {
          return <Option title={option.title} value={option.value}/>
        })}
      </select>
    </div>
  )
}