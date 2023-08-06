import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'

export const useClientRegister = async (
  // data: UserData,
  // setFirstMount: React.Dispatch<React.SetStateAction<boolean>>,
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  // setError: React.Dispatch<React.SetStateAction<string>>,
  // registerFormRef: React.RefObject<HTMLDivElement>,
  // router: AppRouterInstance

  { data, setFirstMount, setLoading, setError, formRef, router }: ClientRegister
) => {
  const { name, email, password } = data

  setFirstMount(true)

  if (name && email && password) {
    try {
      setLoading(true)

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      }
      const response = await fetch('/api/register_api', requestOptions)

      if (!response.ok) {
        const { error } = await response.json()

        setError(error)

        setTimeout(() => {
          setError('')
        }, 5000)

        setLoading(false)
      }

      if (response.ok) {
        if (formRef && formRef.current) {
          formRef.current.style.transform = 'scale(0)'
        }

        router.push('/pages/login')

        setLoading(false)
      }
    } catch (e) {
      setLoading(false)

      setError('Failed to register! Try again.')

      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }
}
