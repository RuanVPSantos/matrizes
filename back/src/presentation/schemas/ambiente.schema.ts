import { z } from "zod";

export const createAmbienteSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional()
  })
});

export const updateAmbienteSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional()
  })
});

export const deleteAmbienteSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});

export const getAmbienteSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});
