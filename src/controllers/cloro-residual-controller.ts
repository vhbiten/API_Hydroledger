import { Request, Response } from "express";
import { prisma } from '@/database/prisma'
import { z } from "zod";

class CloroResidualController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            dataColeta: z.string(),
            cozinha: z.number(),
            saidaTratamento: z.number(),
            bebedouro1: z.number(),
            bebedouro2: z.number(),
            bebedouro3: z.number()
        })

        const { dataColeta, cozinha, saidaTratamento, bebedouro1, bebedouro2, bebedouro3 } = bodySchema.parse(request.body)

        await prisma.cloroResidual.create({
            data: {
                dataColeta: new Date(dataColeta),
                cozinha,
                saidaTratamento,
                bebedouro1,
                bebedouro2,
                bebedouro3
            }
        })

        return response.status(201).json();
    }

    async index(request: Request, response: Response) {
        const cloroResidual = await prisma.cloroResidual.findMany()
        return response.json(cloroResidual)
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.coerce.number().int().positive(),
        })
        const bodySchema = z.object({
            dataColeta: z.string().optional(),
            cozinha: z.number().optional(),
            saidaTratamento: z.number().optional(),
            bebedouro1: z.number().optional(),
            bebedouro2: z.number().optional(),
            bebedouro3: z.number().optional()
        })

        const { id } = paramsSchema.parse(request.params)
        const { dataColeta, cozinha, saidaTratamento, bebedouro1, bebedouro2, bebedouro3 } = bodySchema.parse(request.body)

        await prisma.cloroResidual.update({
            data: {
                dataColeta: dataColeta ? new Date(dataColeta) : undefined,
                cozinha,
                saidaTratamento,
                bebedouro1,
                bebedouro2,
                bebedouro3
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

        await prisma.cloroResidual.delete({
            where: { 
                id 
            }
        })

        return response.status(204).send();
    }
}

export { CloroResidualController }
