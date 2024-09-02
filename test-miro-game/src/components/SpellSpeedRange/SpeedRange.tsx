import styles from './SpeedRange.module.css'

type TSpeedRange = {
  min: number
  max: number
  value: number
  title: string
  onChange: (newValue: number) => void  
}

export const SpeedRange = (props: TSpeedRange) => {
  const { min, max, value = 1,title, onChange } = props

  const handleChange = (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement
    onChange(Number(target.value))
  }
  return (
    <div className={styles.container}>
      <input className={styles.range} type="range" min={min} max={max} value={value} onChange={handleChange} />
      <span className={styles.text}>{title}{value}</span>
    </div>
  )
}