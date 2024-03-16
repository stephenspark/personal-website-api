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
  static readonly SELECT_WHITELIST = {
    uuid: true,
    first_name: true,
    last_name: true,
    email: true,
    encrypted_password: true,
    avatar_url: true,
    created_at: true,
  }

  static async findUserByUUID(uuid: string): Promise<IUser | null> {
    const query = {
      where: {
        uuid: uuid,
      },
      select: this.SELECT_WHITELIST,
    }

    const user = await prisma.users.findUnique(query)

    if (!user) {
      return null
    }

    return user as IUser
  }

  static async findUserByEmail(email: string): Promise<IUser | null> {
    const query = {
      where: {
        email: email,
      },
      select: this.SELECT_WHITELIST,
    }

    const user = await prisma.users.findUnique(query)

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
    const query = {
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        encrypted_password: await saltAndHashString(password),
      },
      select: this.SELECT_WHITELIST,
    }

    const user = await prisma.users.create(query)

    return user as IUser
  }

  static async updateUser(
    uuid: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
  ): Promise<IUser | null> {
    const query = {
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
      select: this.SELECT_WHITELIST,
    }

    const user = await prisma.users.update(query)

    return user as IUser
  }
}
