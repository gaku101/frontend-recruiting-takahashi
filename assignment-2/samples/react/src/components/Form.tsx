import { useEffect, useState } from "react"
import styles from "./Form.module.scss"
import { InputText } from "./InputText"
import { SelectBox } from "./SelectBox"
import { Button } from "./Button"
import { useValidation } from "../utils/useValidation"
import { useDidUpdateEffect } from "../utils/useDidUpdateEffect"

export const Form: React.FC = () => {
  /** 各入力欄のstate */
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [zip, setZip] = useState("")
  const [prefecture, setPrefecture] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")

  /** セレクトボックスに渡す都道府県データ */
  const [prefectures, setPrefectures] = useState<string[]>([])
  useEffect(() => {
    fetch("http://geoapi.heartrails.com/api/json?method=getPrefectures")
      .then((res) => res.json())
      .then((data) => {
        setPrefectures(data.response.prefecture)
      })
  }, [])

  /** useValidationの初期化 */
  const {
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
  } = useValidation()

  /** 各入力欄のバリデーション */
  useDidUpdateEffect(() => {
    nameRules(name)
  }, [name])
  useDidUpdateEffect(() => {
    emailRules(email)
  }, [email])
  useDidUpdateEffect(() => {
    zipRules(zip)
  }, [zip])
  useDidUpdateEffect(() => {
    prefectureRules(prefecture)
  }, [prefecture])
  useDidUpdateEffect(() => {
    address1Rules(address1)
  }, [address1])

  /** フォーム全体のバリデーション */
  useDidUpdateEffect(() => {
    validateForm()
  }, [name, email, zip, prefecture, address1])

  /** ボタン連打防止用のフラグ */
  const [isPushedButton, setIsPushedButton] = useState(false)

  const onClickButton = () => {
    // ボタン連打防止
    setIsPushedButton(true)
    const result = validateForm()
    // フォームのバリデーションを通過していたら入力内容をPOST
    if (result) {
      const body = JSON.stringify({
        name,
        email,
        zip,
        prefecture,
        address11: address1,
        address12: address2,
      })
      console.log("body", body)
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }
      fetch("https://httpstat.us/201", requestOptions)
        .then((response) => console.log("response", response))
        .catch((e) => {
          console.error(e)
        })
        .finally(() => setIsPushedButton(false))
    }
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
