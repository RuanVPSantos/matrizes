import { z } from "zod";

export const createSubambienteSchema = z.object({
  params: z.object({
    ambienteId: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string().optional()
  })
});

export const updateSubambienteSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional()
  })
});

export const deleteSubambienteSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});

export const listSubambientesSchema = z.object({
  params: z.object({
    ambienteId: z.string().transform(val => parseInt(val))
  })
});

export const listSubambientesByIdSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});
