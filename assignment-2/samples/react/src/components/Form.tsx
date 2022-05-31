import styles from "./Form.module.scss"

export const Form: React.FC = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.inputAreaContainer}>
        <label>氏名</label>
        <input type='text' />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>Eメール</label>
        <input type='text' />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>郵便番号</label>
        <input type='text' />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>都道府県</label>
        <input type='text' />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>市区町村・番地</label>
        <input type='text' />
      </div>
      <div className={styles.inputAreaContainer}>
        <label>建物名・号室</label>
        <input type='text' />
      </div>
      <div className={styles.buttonContainer}>
        <button>登録</button>
      </div>
    </div>
  )
}
