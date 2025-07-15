import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import type { Role } from "@prisma/client"

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwtkey"
const JWT_EXPIRES_IN = "7d" // Token expires in 7 days

interface UserPayload {
  id: string
  email: string
  role: Role
}

export const generateToken = (payload: UserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export const verifyToken = (token: string): UserPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload
    return decoded
  } catch (error) {
    return null
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

export const setAuthCookie = (token: string) => {
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export const clearAuthCookie = () => {
  cookies().set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Expire immediately
    path: "/",
  })
}

export const getAuthUser = async (): Promise<UserPayload | null> => {
  const token = cookies().get("auth_token")?.value
  if (!token) {
    return null
  }
  return verifyToken(token)
}
