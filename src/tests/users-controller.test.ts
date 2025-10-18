import request from "supertest"
import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("UsersController", () => {
    const uniqueEmail = `test-${Date.now()}@example.com`

    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            password: "password123",
            email: uniqueEmail
        })
        expect(response.status).toBe(201)
    });

    it("should return 400 when email already exists", async () => {
        await request(app).post("/users").send({
            name: "Test User",
            password: "password123",
            email: "duplicate@example.com"
        })
        const response = await request(app).post("/users").send({
            name: "Another User",
            password: "password456",
            email: "duplicate@example.com"
        })
        expect(response.status).toBe(400)
    });

    it("should return 400 when required fields are missing", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User"
        })

        expect(response.status).toBe(400)
    });

    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                OR: [
                    { email: { contains: "test-" } },
                    { email: { contains: "duplicate" } }
                ]
            }
        })
        await prisma.$disconnect()
    })
});