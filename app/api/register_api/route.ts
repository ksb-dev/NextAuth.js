import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

// utils
import { uploadImageToCloudinary } from '@/utils/uploadImage'

const prisma = new PrismaClient()

export async function POST (request: NextRequest) {
  const body = await request.json()

  const { name, email, password, image } = body.data

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Missing Name, Email or Password.' },
      { status: 400 }
    )
  }

  if (name.length < 3) {
    return NextResponse.json(
      { error: 'Name should contain atleast 3 characters.' },
      { status: 400 }
    )
  }

  if (name.length > 15) {
    return NextResponse.json(
      { error: 'Name should not be more than 15 characters.' },
      { status: 400 }
    )
  }

  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return NextResponse.json({ error: 'Invalid Email.' }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: 'Password should contain atleast 6 characters.' },
      { status: 400 }
    )
  }

  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (isUserExist) {
    return NextResponse.json(
      { error: 'Email already exists.' },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  let isImageUploaded

  if (image) {
    isImageUploaded = await uploadImageToCloudinary(image)
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      image: isImageUploaded ? isImageUploaded.secure_url : ''
    }
  })

  if (newUser) {
    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          image: newUser.image
        }
      },
      { status: 201 }
    )
  }

  return NextResponse.json({ error: 'Failed to sign up.' }, { status: 400 })
}
