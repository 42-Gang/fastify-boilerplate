import { z } from 'zod';

// User schema
export const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Login schema
export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// Signup schema (extends userSchema)
export const signupSchema = userSchema;

// JWT payload schema
export const jwtPayloadSchema = z.object({
  userId: z.string(),
  iat: z.number(),
  exp: z.number(),
});
