import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

// utils
import { deleteImageFromCloudinaty } from '@/utils/deleteImage'

const prisma = new PrismaClient()

export async function POST (request: NextRequest) {
  const body = await request.json()
  const { email, image } = body.user

  if (image) {
    const avatar_url = image.split('/')
    const cloudinaryAvatarId = avatar_url[avatar_url.length - 1]

    const isImageDeleted = await deleteImageFromCloudinaty(
      cloudinaryAvatarId.substring(0, cloudinaryAvatarId.length - 4)
    )

    if (!isImageDeleted) {
      return NextResponse.json(
        { error: 'Failed to delete image.' },
        { status: 400 }
      )
    }
  }

  const isUserDeleted = await prisma.user.delete({
    where: {
      email
    }
  })

  if (!isUserDeleted) {
    return NextResponse.json(
      { message: 'Failed to delete account.' },
      { status: 400 }
    )
  }

  return NextResponse.json({ error: 'Account deleted.' }, { status: 201 })
}
