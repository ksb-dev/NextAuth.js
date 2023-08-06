'use client'

import { useState, useEffect } from 'react'

import styles from './error.module.css'

const Error = ({ error }: any) => {
  const [count, setCount] = useState(9)

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      count > 0 && setCount(count - 1)
    }, 1000)

    //Clearing the interval
    return () => clearInterval(interval)
  }, [count])

  return (
    <div className={styles.error_div}>
      <p className={styles.error_msg}>
        {error}
        <span className={styles.timer}>Left - {count}</span>
      </p>
    </div>
  )
}

export default Error
