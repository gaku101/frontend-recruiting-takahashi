import { useState } from "react"
import styles from "./Form.module.scss"
import { InputText } from "./InputText"

export const Form: React.FC = () => {
  /** 各入力欄のstate */
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [zip, setZip] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")

  /** バリデーションメッセージのstate */
  const [nameValidation, setNameValidation] = useState("")
  const [emailValidation, setEmailValidation] = useState("")
  const [zipValidation, setZipValidation] = useState("")
  const [prefectureValidation, setPrefectureValidation] = useState("")
  const [address1Validation, setAddress1Validation] = useState("")

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputAreaContainer}>
        <label>氏名</label>
        <InputText
          keyword={name}
          setKeyword={setName}
          validation={nameValidation}
          placeholder='(例)トレタ太郎'
        />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>Eメール</label>
        <InputText
          keyword={email}
          setKeyword={setEmail}
          validation={emailValidation}
          placeholder='(例)yoyaku@toreta.in'
        />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>郵便番号</label>
        <InputText
          keyword={zip}
          setKeyword={setZip}
          validation={zipValidation}
          placeholder='(例)0000000'
        />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>都道府県</label>
      </div>
      <div className={styles.inputAreaContainer}>
        <label>市区町村・番地</label>
        <InputText
          keyword={address1}
          setKeyword={setAddress1}
          validation={address1Validation}
          placeholder='(例)品川区西五反田７丁目２２−１７'
        />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>建物名・号室</label>
        <InputText
          keyword={address2}
          setKeyword={setAddress2}
          placeholder='(例)TOCビル8F'
        />
      </div>
      <div className={styles.buttonContainer}>
        <button>登録</button>
      </div>
    </div>
  )
}
