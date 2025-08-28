import { z } from "zod";

export const createArtigoSchema = z.object({
  params: z.object({
    subambienteId: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().optional()
  })
});

export const updateArtigoSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional()
  })
});

export const deleteArtigoSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});

export const listArtigosSchema = z.object({
  params: z.object({
    subambienteId: z.string().transform(val => parseInt(val))
  })
});

export const getArtigoSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});
