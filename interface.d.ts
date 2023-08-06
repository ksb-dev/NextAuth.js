interface UserData {
  name?: string
  email: string
  password: string
  image?: string | ArrayBuffer | null
}

interface CheckFields {
  data: UserData
  nameRef?: React.RefObject<HTMLInputElement>
  emailRef: React.RefObject<HTMLInputElement>
  passwordRef: React.RefObject<HTMLInputElement>
}

interface ClientRegister {
  data: UserData
  setFirstMount: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string>>
  formRef: React.RefObject<HTMLDivElement>
  router: AppRouterInstance
}
