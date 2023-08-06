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

// styles
import styles from './page.module.css'

const page = () => {
  const { data: session } = useSession()

  const [loading, setLoading] = useState(false)

  const mainRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (mainRef && mainRef.current) {
      mainRef.current.style.transform = 'scale(1)'
    }
  }, [])

  const goToLogin = () => {
    if (mainRef && mainRef.current) {
      mainRef.current.style.transform = 'scale(0)'
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
      className='main flex flex-col items-center justify-center text-[#555]  w-[350px] mx-auto p-[2rem] border-[1px] border-[#cdcdcd]'
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

          <div className='flex flex-col items-center justify-center mt-7 w-[100%]'>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-black text-white rounded-tl-[25px] rounded-tr-[25px] mb-1'>
              <span className='text-[1.25rem] mr-2 inline-block'>
                <SiNextdotjs />
              </span>
              <span>Next.js</span>
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#3178C6] text-white mb-1'>
              <span className='text-[1.25rem] mr-2 inline-block'>
                <SiTypescript />
              </span>
              <span>Typescript</span>
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#1a202c] text-white mb-1'>
              <span className='text-[1.25rem] mr-2 inline-block'>
                <SiPrisma />
              </span>
              <span>Prisma</span>
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#116149] text-[#00ed64] mb-1'>
              <span className='text-[1.25rem] mr-2 inline-block'>
                <SiMongodb />
              </span>
              <span>MongoDB</span>
            </p>
            <p className='flex items-center justify-center w-[100%] h-[50px] bg-[#0F172A] text-[#38BDF8] rounded-bl-[25px] rounded-br-[25px]'>
              <span className='text-[1.25rem] mr-2 inline-block'>
                <SiTailwindcss />
              </span>
              <span>Tailwind</span>
            </p>
          </div>

          <p className='text-center mt-10 text-lg'>
            Get starded by clicking below
          </p>

          <button
            onClick={goToLogin}
            className='mt-5 relative h-[50px] w-[50px] rounded-[50%] bg-[var(--color-2)] text-white hover:brightness-[90%]'
          >
            <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <BsArrowRight />
            </span>
          </button>
        </>
      )}

      {session && (
        <>
          <p className='text-[#555] mb-[1rem] text-xl'>Authenticated User</p>

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

          <span className='font-bold mt-[1rem] mb-[0.5rem]'>
            {session.user?.name}
          </span>

          <span> {session.user?.email}</span>
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
