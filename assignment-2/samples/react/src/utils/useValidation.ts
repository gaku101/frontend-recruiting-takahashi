import { useRef, useState } from "react"

export function useValidation() {
  /** バリデーションメッセージのstate */
  const [nameValidation, setNameValidation] = useState("")
  const [emailValidation, setEmailValidation] = useState("")
  const [zipValidation, setZipValidation] = useState("")
  const [prefectureValidation, setPrefectureValidation] = useState("")
  const [address1Validation, setAddress1Validation] = useState("")

  /** フォームのバリデーションを通過しているかどうかのstate */
  const [isValidForm, setIsValidForm] = useState(false)

  /** 各入力欄が正しい値になっているかどうかのstate */
  const isValidName = useRef(false)
  const isValidEmail = useRef(false)
  const isValidZip = useRef(false)
  const isValidPrefecture = useRef(false)
  const isValidAddress1 = useRef(false)

  /** 一度でも入力欄に入力されているかチェック(未入力なら各バリデーション処理内でreturn) */
  const isInputed = useRef(false)
  const checkIsInputed = (v: string) => {
    if (v && !isInputed.current) isInputed.current = true
  }

  const nameRules = (v: string) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setNameValidation("氏名の入力は必須です")
      isValidName.current = false
    } else {
      setNameValidation("")
      isValidName.current = true
    }
  }
  const emailRules = (v: string) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setEmailValidation("Eメールの入力は必須です")
      isValidEmail.current = false
    } else if (
      !v.match(
        /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      )
    ) {
      setEmailValidation("正しいメールアドレスを入力してください")
      isValidEmail.current = false
    } else {
      setEmailValidation("")
      isValidEmail.current = true
    }
  }
  const zipRules = (v: string) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setZipValidation("郵便番号の入力は必須です")
      isValidZip.current = false
    } else if (!v.match(/^[0-9]+$/)) {
      setZipValidation("ハイフンを含めず半角数字で入力してください")
      isValidZip.current = false
    } else if (v.length !== 7) {
      setZipValidation("7桁で入力してください")
      isValidZip.current = false
    } else {
      setZipValidation("")
      isValidZip.current = true
    }
  }
  const prefectureRules = (v: string) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setPrefectureValidation("都道府県の入力は必須です")
      isValidPrefecture.current = false
    } else {
      setPrefectureValidation("")
      isValidPrefecture.current = true
    }
  }
  const address1Rules = (v: string) => {
    checkIsInputed(v)
    if (!isInputed.current) return false
    if (!v) {
      setAddress1Validation("市区町村・番地の入力は必須です")
      isValidAddress1.current = false
    } else {
      setAddress1Validation("")
      isValidAddress1.current = true
    }
  }

  const validateForm = () => {
    // バリデーションに引っ掛かっている入力欄がないかチェック
    const isInclude = [
      isValidName,
      isValidEmail,
      isValidZip,
      isValidPrefecture,
      isValidAddress1,
    ]
      .map((isValid) => isValid.current)
      .includes(false)
    // チェックした結果によってフォーム全体のバリデーション通過状況をセット
    if (isInclude) {
      setIsValidForm(false)
      return false
    } else {
      setIsValidForm(true)
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
    nameValidation,
    emailValidation,
    zipValidation,
    prefectureValidation,
    address1Validation,
    isValidForm,
  }
}
