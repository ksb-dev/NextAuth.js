// next-auth
import { signIn } from 'next-auth/react'

export const useClientLogin = async ({
  data,
  setFirstMount,
  setLoading,
  setError,
  formRef,
  router
}: ClientRegister) => {
  const { email, password } = data

  setFirstMount(true)

  if (email && password) {
    try {
      setLoading(true)

      const response = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (response!.error !== null) {
        setError('Incorrect Email or Password.')

        setLoading(false)
      } else {
        if (formRef && formRef.current) {
          formRef.current.style.transform = 'scale(0)'
        }

        router.push('/')
      }
    } catch (e) {
      setLoading(false)
      //console.log(e)
    }
  }
}
