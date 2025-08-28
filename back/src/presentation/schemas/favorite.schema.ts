import { z } from "zod";

export const addFavoriteSchema = z.object({
  body: z.object({
    artigoId: z.number().int().positive()
  })
});

export const removeFavoriteSchema = z.object({
  body: z.object({
    artigoId: z.number().int().positive()
  })
});

export const listFavoritesSchema = z.object({
  headers: z.object({
    authorization: z.string()
  })
});
