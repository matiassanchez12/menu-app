import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
});

export const menuRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        facebook: z.string().min(1),
        front: z.string().min(1),
        instagram: z.string().min(1),
        profile: z.string().min(1),
        whatsapp: z.string().min(1),
        products: z.array(productSchema).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.menu.create({
        data: {
          name: input.name,
          description: input.description,
          facebook: input.facebook,
          front: input.front,
          instagram: input.instagram,
          profile: input.profile,
          whatsapp: input.whatsapp,
          products: {
            create: input.products.map((product: any) => ({
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.image,
              category: product.category,
            })),
          },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
        include: {
          products: true, // Incluimos los productos en la respuesta para obtener sus IDs, etc.
        },
      });
    }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.menu.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.menu.findMany();
  }),
});
