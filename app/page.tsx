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
    <main ref={mainRef} className={styles.main}>
      {!session && (
        <>
          <p className={styles.paragraph}>Authentication With</p>

          <div className={styles.title}>
            <Image
              src='/logo-sm.png'
              width={30}
              height={30}
              alt='NextAuth.js'
            />
            <span className={styles.title_text}>NextAuth.js</span>
          </div>

          <p className={styles.paragraph}>Using</p>

          <div className={styles.stack}>
            <p className={styles.next_div}>
              <span className={styles.next_icon}>
                <SiNextdotjs />
              </span>
            </p>
            <p className={styles.typescript_div}>
              <span className={styles.typescript_icon}>
                <SiTypescript />
              </span>
            </p>
            <p className={styles.prisma_div}>
              <span className={styles.prisma_icon}>
                <SiPrisma />
              </span>
            </p>
            <p className={styles.mongo_div}>
              <span className={styles.mongo_icon}>
                <SiMongodb />
              </span>
            </p>
            <p className={styles.tailwind_div}>
              <span className={styles.tailwind_icon}>
                <SiTailwindcss />
              </span>
            </p>
          </div>

          <p className={styles.paragraph}>Get starded by clicking below</p>

          <button onClick={goToLogin} className={styles.rightArrowBtn_div}>
            <span className={styles.rightArrowBtn_icon}>
              <BsArrowRight />
            </span>
          </button>
        </>
      )}

      {session && (
        <>
          <p className='flex items-center text-[#555] mb-[2rem] text-xl'>
            Authenticated
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
