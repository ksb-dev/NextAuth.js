'use client'

import { useState, useEffect, useRef } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

//next-auth
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

// hooks
import { useDeleteAccount } from '@/hooks/useDeleteAccount'

// components
import Loading from '@/components/Loading/Loading'

// react-icons
import {
  SiNextdotjs,
  SiPrisma,
  SiMongodb,
  SiTailwindcss,
  SiTypescript
} from 'react-icons/si'
import { BiSolidUserCircle } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { IoIosCheckmarkCircle } from 'react-icons/io'

// styles
import styles from './page.module.css'

const page = () => {
  const { data: session } = useSession()

  const [loading, setLoading] = useState(false)

  const mainRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.style.transform = 'translateX(0)'
    }
  }, [])

  const goToLogin = () => {
    if (mainRef && mainRef.current) {
      mainRef.current.style.transform = 'translateX(100vw)'
      setTimeout(() => router.push('/pages/login'), 50)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true)

    const response = await useDeleteAccount(session)

    if (response.ok) {
      setLoading(false)

      signOut()
    }
  }

  return (
    <main
      ref={mainRef}
      className='main flex flex-col items-center justify-center text-[#555]  w-[350px] mx-auto p-[2rem]'
    >
      {!session && (
        <>
          <p className='text-center mb-5 text-lg'>Authentication With</p>

          <div className='flex items-center'>
            <Image
              src='/logo-sm.png'
              width={30}
              height={30}
              alt='NextAuth.js'
            />
            <span className='title font-black text-[2rem] ml-2'>
              NextAuth.js
            </span>
          </div>

          <p className='text-center mt-5 text-lg'>Using</p>

          <div className='flex items-center justify-center mt-7 w-[100%]'>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-black text-white rounded-tl-[var(--border-radius-1)] rounded-bl-[var(--border-radius-1)]'>
              <span className='text-[1.5rem] inline-block'>
                <SiNextdotjs />
              </span>
              {/* <span>Next.js</span> */}
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#3178C6] text-white'>
              <span className='text-[1.5rem] inline-block'>
                <SiTypescript />
              </span>
              {/* <span>Typescript</span> */}
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#1a202c] text-white'>
              <span className='text-[1.5rem] inline-block'>
                <SiPrisma />
              </span>
              {/* <span>Prisma</span> */}
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#116149] text-[#00ed64]'>
              <span className='text-[1.6rem] inline-block'>
                <SiMongodb />
              </span>
              {/* <span>MongoDB</span> */}
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#0F172A] text-[#38BDF8] rounded-tr-[var(--border-radius-1)] rounded-br-[var(--border-radius-1)]'>
              <span className='text-[1.75rem] inline-block'>
                <SiTailwindcss />
              </span>
              {/* <span>Tailwind</span> */}
            </p>
          </div>

          <p className='text-center mt-10 text-lg'>
            Get starded by clicking below
          </p>

          <button
            onClick={goToLogin}
            className='mt-5 relative h-[42px] w-[42px] rounded-[50%] bg-[var(--color-2)] text-white hover:brightness-[90%]'
          >
            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <BsArrowRight />
            </span>
          </button>
        </>
      )}

      {session && (
        <>
          <p className='flex items-center text-[#555] mb-[2rem] text-xl'>
            Authenticated{' '}
            <span className='ml-2 text-[1.75rem] text-green-500'>
              <IoIosCheckmarkCircle />
            </span>
          </p>

          {session.user?.image ? (
            <img
              src={session.user.image}
              alt='image'
              className={styles.image}
            />
          ) : (
            <p className={styles.no_image}>
              <span className={styles.user_icon}>
                <BiSolidUserCircle />
              </span>
            </p>
          )}

          <span className='font-bold mt-[2rem] mb-[0.5rem]'>
            {session.user?.name}
          </span>

          <span className='mb-[1rem]'> {session.user?.email}</span>
        </>
      )}

      <div className={styles.options}>
        {session && (
          <>
            <button className={styles.sign_out_btn} onClick={() => signOut()}>
              Logout
            </button>
            <button className={styles.delete_btn} onClick={handleDeleteAccount}>
              {loading ? <Loading /> : 'Delete Account'}
            </button>
          </>
        )}
      </div>
    </main>
  )
}

export default page
