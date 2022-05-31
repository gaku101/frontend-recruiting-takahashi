import { useEffect, useState } from "react"
import styles from "./Form.module.scss"
import { InputText } from "./InputText"
import { SelectBox } from "./SelectBox"
import { Button } from "./Button"

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

  /** セレクトボックスに渡す都道府県データ */
  const [prefectures, setPrefectures] = useState<string[]>([])
  useEffect(() => {
    fetch("http://geoapi.heartrails.com/api/json?method=getPrefectures")
      .then((res) => res.json())
      .then((data) => {
        setPrefectures(data.response.prefecture)
      })
  }, [])

  /** フォームのバリデーションに引っ掛かっているかどうかのstate */
  const [isValidForm, setIsValidForm] = useState(true)

  /** ボタン連打防止用のフラグ */
  const [isPushedButton, setIsPushedButton] = useState(false)

  const onClickButton = () => {
    setIsPushedButton(true)
  }

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
        <SelectBox
          options={prefectures}
          selected={prefecture}
          setOption={setPrefecture}
          validation={prefectureValidation}
        />
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
        <Button
          onClickButton={onClickButton}
          label='登録'
          isValid={isValidForm}
          isPushedButton={isPushedButton}
        />
      </div>
    </div>
  )
}
