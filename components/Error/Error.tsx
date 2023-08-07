'use client'

import { useState, useEffect, useRef } from 'react'

// react-icons
import { IoIosClose } from 'react-icons/io'

// styles
import styles from './error.module.css'

const Error = ({ error, setError }: any) => {
  const [count, setCount] = useState(10)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timer.current = setTimeout(() => {
      setError('')
    }, 10000)

    return () => {
      clearTimeout(timer.current!)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      count > 0 && setCount(count - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [count])

  return (
    <div className={styles.error_div}>
      <div className={styles.error_msg}>
        <div>{error}</div>
        <div className={styles.close_timer}>
          <p className={styles.timer}>
            <span className={styles.count}>Time Left : {count}s</span>
          </p>
          <span className={styles.close} onClick={() => setError('')}>
            <IoIosClose />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Error
