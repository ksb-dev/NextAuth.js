'use client'

import React, { useState, useRef, useEffect } from 'react'

// next-router
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

import { signIn, useSession } from 'next-auth/react'

const SignIn = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [firstMount, setFirstMount] = useState(false)

  const loginFormRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (session) return router.push('/')

    if (loginFormRef && loginFormRef.current) {
      loginFormRef.current.style.transform = 'scale(1)'
    }
  }, [session])

  useEffect(() => {
    if (firstMount) {
      useCheckFields({ data, emailRef, passwordRef })
    }
  }, [data.email, data.password, firstMount, session])

  const handleSignIn = async () => {
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
      loginFormRef.current.style.transform = 'scale(0)'
      setTimeout(() => router.push('/'), 50)
    }
  }

  const goToRegister = () => {
    if (loginFormRef && loginFormRef.current) {
      loginFormRef.current.style.transform = 'scale(0)'
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
            <p className='tag'>Sign In</p>

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

            <button className='submit_btn' onClick={handleSignIn}>
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
                Sign in with Google
              </div>

              <div className='github_div' onClick={() => signIn('github')}>
                <div className='github_icon_div'>
                  <span className='github_icon'>
                    <AiFillGithub />
                  </span>
                </div>
                Sign in with GitHub
              </div>
            </div>
          </div>

          {error && <Error error={error} setError={setError} />}
        </div>
      )}
    </>
  )
}

export default SignIn
