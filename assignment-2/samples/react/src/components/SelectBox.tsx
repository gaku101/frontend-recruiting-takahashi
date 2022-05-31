import { Dispatch, SetStateAction, useCallback } from "react"
import styles from "./SelectBox.module.scss"

type Props = {
  options: string[]
  selected: string
  setOption: Dispatch<SetStateAction<string>>
  validation?: string
}

export const SelectBox: React.FC<Props> = (props) => {
  const { options, setOption, validation, selected } = props
  const handleChangeOption = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.currentTarget
      setOption(value)
    },
    [setOption]
  )
  return (
    <>
      <div className={styles.selectContainer}>
        <select
          // 未選択時のスタイル付与
          className={!selected ? styles.placeholder : ""}
          defaultValue='placeholder'
          onChange={handleChangeOption}
        >
          <option
            className={styles.placeholder}
            value='placeholder'
            disabled
            hidden
          >
            選択してください
          </option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>
          })}
        </select>
      </div>
      <span className={styles.validation}>{validation}</span>
    </>
  )
}
