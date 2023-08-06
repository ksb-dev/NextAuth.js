import { RefObject } from 'react'

export const useCheckFields = ({
  data,
  emailRef,
  passwordRef,
  nameRef
}: CheckFields) => {
  let flag = true

  const { name, email, password } = data

  if (!name && nameRef && nameRef.current) {
    nameRef.current.style.outline = '2px solid tomato'
    flag = false
  } else if (nameRef && nameRef.current) {
    nameRef.current.style.outline = '1px solid #cdcdcd'
  }

  if (!email && emailRef && emailRef.current) {
    emailRef.current.style.outline = '2px solid tomato'
    flag = false
  } else if (emailRef && emailRef.current) {
    emailRef.current.style.outline = '1px solid #cdcdcd'
  }

  if (!password && passwordRef && passwordRef.current) {
    passwordRef.current.style.outline = '2px solid tomato'
    flag = false
  } else if (passwordRef && passwordRef.current) {
    passwordRef.current.style.outline = '1px solid #cdcdcd'
  }

  return flag
}
