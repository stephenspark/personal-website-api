import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function saltAndHashString(stringToHash: string): Promise<string> {
  return await bcrypt.hash(stringToHash, SALT_ROUNDS)
}

export async function validatePasswordMatch(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
