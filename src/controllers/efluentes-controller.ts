import { Request, Response } from "express";
import { prisma } from '@/database/prisma'
import { z } from "zod";

class EfluentesController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            dataColeta: z.string(),
            vazao1: z.number(),
            vazao2: z.number(),
            vazao3: z.number(),
            ph: z.number(),
            temperatura: z.number(),
            condutividade: z.number(),
            SD30: z.number()
        })

        const { dataColeta, vazao1, vazao2, vazao3, ph, temperatura, condutividade, SD30 } = bodySchema.parse(request.body)

        await prisma.efluentes.create({
            data: {
                dataColeta: new Date(dataColeta),
                vazao1,
                vazao2,
                vazao3,
                ph,
                temperatura,
                condutividade,
                SD30
            }
        })

        return response.status(201).json();
    }

    async index(request: Request, response: Response) {
        const efluentes = await prisma.efluentes.findMany()
        return response.json(efluentes)
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number().int().positive(),
        })
        const bodySchema = z.object({
            dataColeta: z.string().optional(),
            vazao1: z.number().optional(),
            vazao2: z.number().optional(),
            vazao3: z.number().optional(),
            ph: z.number().optional(),
            temperatura: z.number().optional(),
            condutividade: z.number().optional(),
            SD30: z.number().optional()
        })

        const { id } = paramsSchema.parse(request.params)
        const { dataColeta, vazao1, vazao2, vazao3, ph, temperatura, condutividade, SD30 } = bodySchema.parse(request.body)

        await prisma.efluentes.update({
            data: {
                dataColeta: dataColeta ? new Date(dataColeta) : undefined,
                vazao1,
                vazao2,
                vazao3,
                ph,
                temperatura,
                condutividade,
                SD30
            },
            where: {
                id,
            }
        })

        return response.json();
    }

    async remove(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number().int().positive(),
        })
        
        const { id } = paramsSchema.parse(request.params)

        await prisma.efluentes.delete({
            where: { 
                id 
            }
        })

        return response.status(204).send();
    }
}

export { EfluentesController }
