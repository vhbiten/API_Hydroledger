import { Request, Response } from "express";
import { prisma } from '@/database/prisma'
import { z } from "zod";

class PocosController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            dataColeta: z.string(),
            numeroPoco: z.number().int().min(1).max(3),
            hidrometro: z.number(),
            horimetro: z.number()
        })

        
        const { dataColeta, numeroPoco, hidrometro, horimetro } = bodySchema.parse(request.body)

        await prisma.pocos.create({
            data: {
                dataColeta: new Date(dataColeta),
                numeroPoco: numeroPoco,
                hidrometro: hidrometro,
                horimetro: horimetro
            }
        })

        return response.status(201).json();
    }

    async index(request: Request, response: Response) {
        const pocos = await prisma.pocos.findMany()
        return response.json(pocos)
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            //converte string para numero e checa se é inteiro e positivo
            id: z.coerce.number().int().positive(),
        })
        const bodySchema = z.object({
            dataColeta: z.string().optional(),
            numeroPoco: z.number().int().min(1).max(3).optional(),
            hidrometro: z.number().optional(),
            horimetro: z.number().optional()
        })

        const { id } = paramsSchema.parse(request.params)
        const { dataColeta, numeroPoco, hidrometro, horimetro } = bodySchema.parse(request.body)

        await prisma.pocos.update({
            data: {
                dataColeta: dataColeta ? new Date(dataColeta) : undefined,
                numeroPoco,
                hidrometro,
                horimetro,
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

        await prisma.pocos.delete({
            where: { 
                id 
            }
        })

        return response.status(204).send();
    }
}

export { PocosController }
