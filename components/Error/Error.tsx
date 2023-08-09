'use client'

import { useState, useEffect, useRef } from 'react'

// styles
import styles from './error.module.css'

interface Props {
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
}

const Error = ({ error, setError }: Props) => {
  const [count, setCount] = useState(10)
  //const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const errorMsgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      errorMsgRef.current!.style.transform = 'scale(1)'
    }, 150)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      errorMsgRef.current!.style.transform = 'scale(0)'
      setTimeout(() => {
        setError('')
      }, 150)
    }, 10000)

    return () => {
      //clearTimeout(timer.current!)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      count > 0 && setCount(count - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [count])

  const closeError = () => {
    errorMsgRef.current!.style.transform = 'scale(0)'
    setTimeout(() => {
      setError('')
    }, 150)
  }

  return (
    <div className={styles.error_div}>
      <div className={styles.error_msg} ref={errorMsgRef}>
        <div>{error}</div>
        <div className={styles.close_timer}>
          <p className={styles.timer}>
            <span className={styles.count}>Time Left : {count}s</span>
          </p>
          <span className={styles.close} onClick={closeError}>
            Close
          </span>
        </div>
      </div>
    </div>
  )
}

export default Error
