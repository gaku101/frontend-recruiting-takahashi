import { Dispatch, SetStateAction, useRef } from "react"

export function useValidation() {
  const isInputed = useRef(false)
  const checkIsInputed = (v: string) => {
    if (v && !isInputed.current) isInputed.current = true
  }
  const nameRules = (v: string, setName: Dispatch<SetStateAction<string>>) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setName("氏名の入力は必須です")
      return false
    } else {
      setName("")
      return true
    }
  }
  const emailRules = (
    v: string,
    setEmail: Dispatch<SetStateAction<string>>
  ) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setEmail("Eメールの入力は必須です")
      return false
    } else if (
      !v.match(
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      )
    ) {
      setEmail("正しいメールアドレスを入力してください")
      return false
    } else {
      setEmail("")
      return true
    }
  }
  const zipRules = (v: string, setZip: Dispatch<SetStateAction<string>>) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setZip("郵便番号の入力は必須です")
      return false
    } else if (!v.match(/^[0-9]+$/)) {
      setZip("ハイフンを含めず半角数字で入力してください")
      return false
    } else if (v.length !== 7) {
      setZip("7桁で入力してください")
      return false
    } else {
      setZip("")
      return true
    }
  }
  const prefectureRules = (
    v: string,
    setPrefecture: Dispatch<SetStateAction<string>>
  ) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setPrefecture("都道府県の入力は必須です")
      return false
    } else {
      setPrefecture("")
      return true
    }
  }
  const address1Rules = (
    v: string,
    setAddress1: Dispatch<SetStateAction<string>>
  ) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setAddress1("市区町村・番地の入力は必須です")
      return false
    } else {
      setAddress1("")
      return true
    }
  }
  const validateForm = (
    isValidList: React.MutableRefObject<boolean>[],
    setIsValid: Dispatch<SetStateAction<boolean>>
  ) => {
    const isInclude = isValidList
      .map((isValid) => isValid.current)
      .includes(false)
    if (isInclude) {
      setIsValid(true)
      return false
    } else {
      setIsValid(false)
      return true
    }
  }
  return {
    nameRules,
    emailRules,
    zipRules,
    prefectureRules,
    address1Rules,
    validateForm,
  }
}
