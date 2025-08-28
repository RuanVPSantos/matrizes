import { z } from "zod";

// Common response schemas
export const messageResponseSchema = z.object({
  message: z.string()
});

export const errorResponseSchema = z.object({
  message: z.string()
});

// User response schemas
export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const userWithTokenResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["ADMIN", "USER"]),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  token: z.string()
});

export const tokenResponseSchema = z.object({
  token: z.string()
});

// Content response schemas
export const ambienteResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  subambientes: z.array(z.any()).optional()
});

export const subambienteResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  ambienteId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  artigos: z.array(z.any()).optional()
});

export const artigoResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  subambienteId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  blocks: z.array(z.any()).optional()
});

export const blocoStyleSchema = z.object({
  fontSize: z.enum(["small", "medium", "large", "xlarge"]).optional(),
  textAlign: z.enum(["left", "center", "right", "justify"]).optional(),
  fontWeight: z.enum(["normal", "bold"]).optional(),
  fontStyle: z.enum(["normal", "italic"]).optional(),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional()
});

export const blocoContentSchema = z.object({
  text: z.string().optional(),
  url: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  title: z.string().optional(),
  duration: z.string().optional(),
  style: blocoStyleSchema.optional()
});

export const blocoResponseSchema = z.object({
  id: z.number(),
  type: z.enum(["TEXTO", "IMAGEM", "VIDEO"]),
  order: z.number(),
  content: blocoContentSchema,
  artigoId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string()
});

// Header response schema
export const headerArtigoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable()
});

export const headerSubambienteSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  artigos: z.array(headerArtigoSchema)
});

export const headerAmbienteSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  subambientes: z.array(headerSubambienteSchema)
});

export const headerResponseSchema = z.array(headerAmbienteSchema);
