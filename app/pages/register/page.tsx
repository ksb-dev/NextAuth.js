'use client'

import React, { useState, useRef, useEffect } from 'react'

// next-router
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// hooks
import { useCheckFields } from '@/hooks/useCheckFields'
import { useClientRegister } from '@/hooks/useClientRegister'

// components
import Loading from '@/components/Loading/Loading'
import Error from '@/components/Error/Error'

// react-icons
import { LiaHomeSolid } from 'react-icons/lia'

// styles
import styles from './page.module.css'

const SignUp = () => {
  const [data, setData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    image: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [firstMount, setFirstMount] = useState(false)

  const registerFormRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  useEffect(() => {
    if (registerFormRef && registerFormRef.current) {
      registerFormRef.current.style.transform = 'translateX(0)'
    }

    if (firstMount) {
      useCheckFields({ data, emailRef, passwordRef, nameRef })
    }
  }, [data.name, data.email, data.password, firstMount])

  // Handle SignUp
  const handleSignUp = async (e: any) => {
    e.preventDefault()

    setFirstMount(true)

    useClientRegister({
      data,
      setFirstMount,
      setLoading,
      setError,
      formRef: registerFormRef,
      router
    })
  }

  const previewFiles = (image: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(image)

    reader.onloadend = () => {
      setData({ ...data, image: reader.result })
    }
  }

  const setlectImage = (e: any) => {
    const image = e.target.files[0]
    previewFiles(image)
  }

  const backToHome = () => {
    if (registerFormRef && registerFormRef.current) {
      registerFormRef.current.style.transform = 'translateX(100vw)'
      setTimeout(() => router.push('/'), 50)
    }
  }

  const goToLogin = () => {
    if (registerFormRef && registerFormRef.current) {
      registerFormRef.current.style.transform = 'translateX(100vw)'
      setTimeout(() => router.push('/pages/login'), 50)
    }
  }

  return (
    <>
      <div className='form_div' ref={registerFormRef}>
        <form className='form' onSubmit={handleSignUp}>
          <div onClick={backToHome} className='home_link'>
            <span className='home_icon'>
              <LiaHomeSolid />
            </span>
          </div>

          <p className='tag'>Register</p>

          <div className='input_div'>
            <label htmlFor='name' className='label'>
              Name
            </label>
            <input
              ref={nameRef}
              id='name'
              type='text'
              value={data.name}
              className='input'
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div className='input_div'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              ref={emailRef}
              id='emial'
              type='email'
              value={data.email}
              className='input'
              onChange={e => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div className='input_div'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              ref={passwordRef}
              id='password'
              type='password'
              value={data.password}
              className='input'
              onChange={e => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div className={styles.profile_upload}>
            <label htmlFor='image' className='label'>
              Picture
            </label>
            <div>
              <input
                type='file'
                id='image'
                accept='image/*'
                onChange={e => setlectImage(e)}
                className={styles.image_input}
              />
            </div>
          </div>

          <button type='submit' className='submit_btn'>
            {loading ? <Loading /> : 'SUBMIT'}
          </button>

          <div className='ask'>
            Already have an account?{' '}
            <span className='link' onClick={goToLogin}>
              Login
            </span>
          </div>

          {error && <Error error={error} setError={setError} />}
        </form>
      </div>
    </>
  )
}

export default SignUp
