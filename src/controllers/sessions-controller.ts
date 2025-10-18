import { Request, Response } from 'express'
import { AppError } from "@/utils/AppError"
import { authConfig } from "@/configs/auth"
import { prisma } from '@/database/prisma'
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { z } from 'zod'


class SessionsController {
    async create (request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        })

        //verifica se o email é válido
        const { email, password } = bodySchema.parse(request.body)
        const user = await prisma.user.findFirst({
            where: { email }
        })

        if (!user) {
            throw new AppError('Email ou senha inválidos', 401)
        }

        //verifica se a senha está correta
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            throw new AppError('Email ou senha inválidos', 401)
        }

        //captura o token
        const { secret, expiresIn } = authConfig.jwt
        const token = sign(
            { role: user.role ?? "querier" },
            secret,
            { subject: user.id, expiresIn: "1d" }
        )

        const { password: hashedPassword, ...userWithoutPassword } = user

        return response.json({ token, user: userWithoutPassword });
    }
}

export { SessionsController };