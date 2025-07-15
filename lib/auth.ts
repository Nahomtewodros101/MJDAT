import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { Role } from "@prisma/client";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretjwtkey"
);
const JWT_EXPIRES_IN = "7d"; // Token expires in 7 days

interface UserPayload {
  id: string;
  email: string;
  role: Role;
  name?: string; // Add name to payload
}

export const generateToken = async (payload: UserPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(JWT_SECRET);
};

export const verifyToken = async (
  token: string
): Promise<UserPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return payload as UserPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const setAuthCookie = (token: string) => {
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
};

export const clearAuthCookie = () => {
  cookies().set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Expire immediately
    path: "/",
  });
};

export const getAuthUser = async (): Promise<UserPayload | null> => {
  const token = cookies().get("auth_token")?.value;
  if (!token) {
    return null;
  }
  return verifyToken(token);
};
