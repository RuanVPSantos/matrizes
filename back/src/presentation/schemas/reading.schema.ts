import { z } from "zod";

export const markBlocoAsReadSchema = z.object({
  body: z.object({
    blocoId: z.number().int().positive()
  })
});

export const listReadBlocosSchema = z.object({
  params: z.object({
    artigoId: z.string().transform(val => parseInt(val))
  }),
  headers: z.object({
    authorization: z.string()
  })
});
