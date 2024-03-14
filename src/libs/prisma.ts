import { PrismaClient } from '@prisma/client'

interface PrismaGlobal {
  prisma: PrismaClient
}

declare const global: PrismaGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
