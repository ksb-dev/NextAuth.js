import styles from './error.module.css'

const Error = ({ error }: any) => {
  return (
    <div className={styles.error_div}>
      <p className={styles.error_msg}>{error}</p>
    </div>
  )
}

export default Error
