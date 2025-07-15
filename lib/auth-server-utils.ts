// This file contains server-only utilities that cannot run on the Edge Runtime.
// It uses 'bcryptjs' for password hashing, which relies on Node.js APIs.

import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
