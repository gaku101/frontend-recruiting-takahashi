import { useCallback } from "react"
import styles from "./Button.module.scss"

type Props = {
  onClickButton: () => void
  label: string
  isValid: boolean
  isPushedButton: boolean
}
export const Button: React.FC<Props> = (props) => {
  const { onClickButton, label, isValid, isPushedButton } = props
  const handleClick = useCallback(() => {
    onClickButton()
  }, [onClickButton])
  
  return (
    <button
      className={styles.button}
      onClick={handleClick}
      disabled={isValid || isPushedButton}
    >
      {label}
    </button>
  )
}
