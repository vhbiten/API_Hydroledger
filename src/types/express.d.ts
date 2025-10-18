//adiciona o user dentro de uma Request

declare namespace Express {
    export interface Request {
        user?: {
            id: string
            role: string
        }
    }
}