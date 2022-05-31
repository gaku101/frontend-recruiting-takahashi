import styles from "./InputText.module.scss"
import { Dispatch, SetStateAction, useCallback } from "react"

type Props = {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
  validation?: string
  placeholder: string
}
export const InputText: React.FC<Props> = (props) => {
  const { keyword, setKeyword, validation, placeholder } = props
  const handleChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget
      setKeyword(value)
    },
    [setKeyword]
  )
  return (
    <div className={styles.inputTextContainer}>
      <input
        // バリデーションに引っ掛かっていたらスタイル変更
        className={validation ? styles.invalidInput : ""}
        type='text'
        value={keyword}
        onChange={handleChangeKeyword}
        placeholder={placeholder}
      />
      <span>{validation}</span>
    </div>
  )
}
