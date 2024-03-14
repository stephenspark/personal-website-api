import prisma from '../src/libs/prisma'
import { saltAndHashString } from '../src/libs/bcrypt'

async function main() {
  // Users
  const password = await saltAndHashString('randompassword')
  const user1 = await prisma.users.upsert({
    where: { email: 'ssp0929@gmail.com' },
    update: {},
    create: {
      email: 'ssp0929@gmail.com',
      first_name: 'Stephen',
      last_name: 'Park',
      encrypted_password: password,
    },
  })
  console.log({ user1 })

  // Roles
  const role1 = await prisma.roles.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'admin role',
      created_by_user_id: user1.id,
    },
  })
  console.log({ role1 })

  // Users to Roles
  const userToRole1 = await prisma.user_to_role.upsert({
    where: {
      user_id_role_id: {
        user_id: user1.id,
        role_id: role1.id,
      },
    },
    update: {},
    create: {
      user_id: user1.id,
      role_id: role1.id,
      created_by_user_id: user1.id,
    },
  })
  console.log({ userToRole1 })

  // Post Types
  const postType1 = await prisma.post_types.upsert({
    where: { name: 'blog' },
    update: {},
    create: {
      name: 'blog',
      description: 'A blog post',
    },
  })

  const postType2 = await prisma.post_types.upsert({
    where: { name: 'photo' },
    update: {},
    create: {
      name: 'photo',
      description: 'A photo',
    },
  })

  console.log({ postType1, postType2 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
