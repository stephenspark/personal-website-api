import prisma from '../libs/prisma'

import { saltAndHashString } from '../libs/bcrypt'
export interface IUser {
  uuid: string
  first_name: string
  last_name: string
  email: string
  encrypted_password: string
  avatar_url: string | null
  updated_at: Date
  created_at: Date
}

export default class User {
  static async findUserByUUID(uuid: string): Promise<IUser | null> {
    const user = await prisma.users.findUnique({
      where: {
        uuid: uuid,
      },
    })

    if (!user) {
      return null
    }

    return user as IUser
  }

  static async findUserByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    })

    if (!user) {
      return null
    }

    return user as IUser
  }

  static async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<IUser | null> {
    const user = await prisma.users.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        encrypted_password: await saltAndHashString(password),
      },
    })

    return user as IUser
  }

  static async updateUser(
    uuid: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ): Promise<IUser | null> {
    const user = await prisma.users.update({
      where: {
        uuid: uuid,
      },
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        encrypted_password: password
          ? await saltAndHashString(password)
          : undefined,
      },
    })

    return user as IUser
  }
}
