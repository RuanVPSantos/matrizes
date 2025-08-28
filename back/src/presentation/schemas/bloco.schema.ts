import { z } from "zod";

export const createBlocoSchema = z.object({
  params: z.object({
    artigoId: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    type: z.enum(["TEXTO", "IMAGEM", "VIDEO"]),
    order: z.number().int().min(0),
    content: z.any()
  })
});

export const updateBlocoSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    type: z.enum(["TEXTO", "IMAGEM", "VIDEO"]).optional(),
    order: z.number().int().min(0).optional(),
    content: z.any().optional()
  })
});

export const deleteBlocoSchema = z.object({
  params: z.object({
    id: z.string().transform(val => parseInt(val))
  })
});

export const reorderBlocosSchema = z.object({
  params: z.object({
    artigoId: z.string().transform(val => parseInt(val))
  }),
  body: z.object({
    orderList: z.array(z.object({
      id: z.number().int(),
      order: z.number().int().min(0)
    }))
  })
});
