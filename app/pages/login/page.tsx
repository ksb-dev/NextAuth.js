'use client'

import React, { useState, useRef, useEffect } from 'react'

// next-router
import { useRouter } from 'next/navigation'

// hooks
import { useCheckFields } from '@/hooks/useCheckFields'
import { useClientLogin } from '@/hooks/useClientLogin'

// components
import Loading from '@/components/Loading/Loading'
import Error from '@/components/Error/Error'

// react-icons
import { LiaHomeSolid } from 'react-icons/lia'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

import { signIn, useSession } from 'next-auth/react'

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [firstMount, setFirstMount] = useState(false)
  const [showPassword, setShowPassword] = useState('password')

  const loginFormRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (data.password.length === 0) {
      setShowPassword('password')
    }
  }, [data.password])

  useEffect(() => {
    if (session) return router.push('/')

    if (loginFormRef && loginFormRef.current) {
      loginFormRef.current.style.transform = 'translateX(0)'
    }
  }, [session])

  useEffect(() => {
    if (firstMount) {
      useCheckFields({ data, emailRef, passwordRef })
    }
  }, [data.email, data.password, firstMount, session])

  const handleLogin = async () => {
    useClientLogin({
      data,
      setFirstMount,
      setLoading,
      setError,
      formRef: loginFormRef,
      router
    })
  }

  const backToHome = () => {
    if (loginFormRef && loginFormRef.current) {
      loginFormRef.current.style.transform = 'translateX(100vw)'
      setTimeout(() => router.push('/'), 50)
    }
  }

  const goToRegister = () => {
    if (loginFormRef && loginFormRef.current) {
      loginFormRef.current.style.transform = 'translateX(100vw)'
      setTimeout(() => router.push('/pages/register'), 50)
    }
  }

  return (
    <>
      {!session && (
        <div className='form_div' ref={loginFormRef}>
          <div className='form'>
            <div onClick={backToHome} className='home_link'>
              <span className='home_icon'>
                <LiaHomeSolid />
              </span>
            </div>
            <p className='tag'>Login</p>

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
                type={showPassword}
                value={data.password}
                className='input'
                onChange={e => setData({ ...data, password: e.target.value })}
              />

              {showPassword === 'password'
                ? data.password && (
                    <span
                      className='eye'
                      onClick={() => setShowPassword('text')}
                    >
                      <AiOutlineEyeInvisible />
                    </span>
                  )
                : data.password && (
                    <span
                      className='eye'
                      onClick={() => setShowPassword('password')}
                    >
                      <AiOutlineEye />
                    </span>
                  )}
            </div>

            <button className='submit_btn' onClick={handleLogin}>
              {loading ? <Loading /> : 'SUBMIT'}
            </button>

            <div className='ask'>
              Don't have an account?{' '}
              <span className='link' onClick={goToRegister}>
                Register
              </span>
            </div>

            <p className='line'>
              <span className='or'>OR</span>
            </p>

            <div>
              <div className='google_div' onClick={() => signIn('google')}>
                <div className='google_icon_div'>
                  <span className='google_icon'>
                    <FcGoogle />
                  </span>
                </div>
                Login in with Google
              </div>

              <div className='github_div' onClick={() => signIn('github')}>
                <div className='github_icon_div'>
                  <span className='github_icon'>
                    <AiFillGithub />
                  </span>
                </div>
                Login in with GitHub
              </div>
            </div>
          </div>

          {error && <Error error={error} setError={setError} />}
        </div>
      )}
    </>
  )
}

export default Login
