type TSpellSpeedRange = {
  min: number
  max: number
  value: number
  onChange: (newValue: number) => void  
}

export const Range = (props: TSpellSpeedRange) => {
  const { min, max, value = 1, onChange } = props

  const handleChange = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    onChange(Number(target.value))
  }
  return (
    <div>
      <input type="range" min={min} max={max} value={value} onChange={handleChange} />
      <span>Скорость заклинания - {value}</span>
    </div>
  )
}