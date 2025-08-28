import { z } from "zod";

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["ADMIN", "USER"]).optional(),
    blocked: z.boolean().optional()
  })
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});
